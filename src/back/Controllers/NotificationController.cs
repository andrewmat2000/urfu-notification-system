using System.Net;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Text.RegularExpressions;
using BackUrfuNotificationSystem.Models.API;
using BackUrfuNotificationSystem.Singletons;
using iTextSharp.text.pdf;
using MailKit;
using MailKit.Net.Imap;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;

namespace BackUrfuNotificationSystem.Controllers;

[ApiController]
[Route("api/notify")]
public partial class NotificationController(DatabaseContext databaseContext, NotifyManager notifyManager) : ControllerBase {

  [GeneratedRegex(@"РтФ\d{4}-\d{9}")]
  private static partial Regex RegexAgreementNumber();

  private readonly DatabaseContext _databaseContext = databaseContext;
  private readonly NotifyManager _notifyManager = notifyManager;
  private readonly string _ocrUrl = (Environment.GetEnvironmentVariable("OCR_HOST") ?? "http://host.docker.internal:8080") + "/ocr";

  [HttpPost("send_all")]
  public async Task<SendNotificationsResponse> SendNotifications([FromForm] SendNotificationsRequest sendNotificationsRequest) {
    if (sendNotificationsRequest.Files.Count == 0) {
      Response.StatusCode = StatusCodes.Status400BadRequest;

      return new();
    }

    var list = new List<string>();

    using var client = new ImapClient();

    await client.ConnectAsync("imap.gmail.com", 993);

    await client.AuthenticateAsync(sendNotificationsRequest.Login, sendNotificationsRequest.Password);

    IMailFolder draftFolder;
    try {
      draftFolder = client.GetFolder(SpecialFolder.Drafts);
    } catch {
      draftFolder = client.GetFolder(client.PersonalNamespaces[0]).Create(SpecialFolder.Drafts.ToString(), true);
    }


    var response = new SendNotificationsResponse();

    var counter = 0;

    for (var i = 0; i < sendNotificationsRequest.Files.Count; i++) {
      using var readStream = sendNotificationsRequest.Files.ElementAt(i).OpenReadStream();
      using var writeStream = new MemoryStream();

      using var reader = new PdfReader(readStream);


      for (var pageNum = 1; pageNum <= reader.NumberOfPages; pageNum++) {
        counter++;

        var tmpPosition = readStream.Position;

        readStream.Position = 0;

        var tmpReader = new PdfReader(readStream);

        tmpReader.SelectPages(pageNum.ToString());

        using var pdfStamper = new PdfStamper(tmpReader, writeStream);

        pdfStamper.Close();
        tmpReader.Close();

        readStream.Position = tmpPosition;

        var fileName = string.Format("{0}-{1}-{2}-{3}_{4}_{5}.pdf",
          DateTime.Now.Day,
          DateTime.Now.Month,
          DateTime.Now.Year,
          DateTime.Now.Hour,
          DateTime.Now.Minute,
          DateTime.Now.Second
        // file.FileName
        );

        var cookieContainer = new CookieContainer();

        cookieContainer.Add(new Uri(_ocrUrl), new Cookie("i18n_redirected", "ru"));

        using var httpClient = new HttpClient(new HttpClientHandler() {
          CookieContainer = cookieContainer,
        });

        var content = new MultipartFormDataContent();

        writeStream.Position = 0;

        var fileContent = new StreamContent(writeStream);
        fileContent.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
        fileContent.Headers.ContentDisposition = new ContentDispositionHeaderValue("form-data") {
          Name = "file",
          FileName = fileName,
        };

        content.Add(fileContent);

        var request = new HttpRequestMessage(HttpMethod.Post, _ocrUrl) {
          Content = content,
          Headers = {
              { "User-Agent", Request.Headers.TryGetValue("User-Agent", out var userAgent) ? userAgent : "" },
              { "languages", "rus" }
            }
        };

        var ocrResponse = await httpClient.SendAsync(request);

        var text = await ocrResponse.Content.ReadAsStringAsync();

        var regex = RegexAgreementNumber();

        var agreementNumber = regex.Match(text);

        if (agreementNumber == null || string.IsNullOrEmpty(agreementNumber.Value)) {
          Response.StatusCode = StatusCodes.Status404NotFound;
          response.PagesError.Add(new() {
            DocumentNumber = i,
            PageNumber = pageNum - 1,
            Error = ReceiveError.AgreementNumberNotFound
          });
          continue;
        }

        writeStream.Position = 0;


        using var stream = System.IO.File.Create(fileName);

        writeStream.CopyTo(stream);

        stream.Close();

        // // отправитель - устанавливаем адрес и отображаемое в письме имя
        // MailAddress from = new(sendNotificationsRequest.Email);

        var student = _databaseContext.Students.Include(x => x.Agreement).FirstOrDefault(x => x.Agreement.Number == agreementNumber.Value);

        if (student == null || student.Email == null) {
          Response.StatusCode = StatusCodes.Status404NotFound;
          response.PagesError.Add(new() {
            DocumentNumber = i,
            PageNumber = pageNum - 1,
            Error = ReceiveError.StudentNotFound
          });
          continue;
        }

        // // кому отправляем
        // MailAddress to = new(student.Email);
        // // создаем объект сообщения
        // MailMessage m = new(from, to) {
        //   // тема письма
        //   Subject = sendNotificationsRequest.MessageTitle,
        //   // текст письма
        //   Body = sendNotificationsRequest.MessageText,
        //   // письмо представляет код html
        //   IsBodyHtml = true
        // };

        // m.Attachments.Add(new Attachment(writeStream, "уведомление.pdf"));

        // SmtpClient smtp = new("smtp.gmail.com", 587) {
        //   // логин и пароль
        //   Credentials = new NetworkCredential(sendNotificationsRequest.Email, sendNotificationsRequest.Password),
        //   EnableSsl = true
        // };

        // smtp.Send(m);

        draftFolder.Open(FolderAccess.ReadWrite);

        var mimeMessage = new MimeMessage {
          Subject = sendNotificationsRequest.MessageTitle ?? "Заголовок"
        };
        mimeMessage.From.Add(new MailboxAddress("", sendNotificationsRequest.Login));
        mimeMessage.To.Add(new MailboxAddress(student.FirstName, student.Email));

        var builder = new BodyBuilder {
          TextBody = sendNotificationsRequest.MessageText ?? "Текст"
        };

        builder.Attachments.Add(fileName);

        mimeMessage.Body = builder.ToMessageBody();

        var appendRequest = new AppendRequest(mimeMessage);

        draftFolder.Append(appendRequest);

        draftFolder.Expunge();

        System.IO.File.Delete(fileName);

        response.MessagesSended.Add(new() {
          DocumentNumber = i,
          PageNumber = pageNum - 1,
          Receiver = new() {
            Email = student.Email,
            FullName = $"{student.LastName} {student.FirstName} {student.Surname}"
          }
        });
      }
    }

    response.AmountOfPages = counter;

    return response;
  }

  [HttpGet("get_all")]
  public ActionResult GetAll() {
    if (_notifyManager.Doc.Length == 0) {
      return NotFound();
    }

    return File(_notifyManager.Doc, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", fileDownloadName: $"Уведомления-{DateTime.Now}.docx");
  }
  [HttpGet("get_with_agreement")]
  public ActionResult GetActionLogsByUserId(string agreementNumber) {
    if (!_notifyManager.Docs.ContainsKey(agreementNumber)) {
      return NotFound();
    }

    var student = _databaseContext.Students.Include(x => x.Agreement).FirstOrDefault(x => x.Agreement.Number == agreementNumber);

    return File(_notifyManager.Docs[agreementNumber], "application/msword", $"{student?.LastName}_{student?.FirstName}_{student?.Surname}.docx");
  }
}