
using BackUrfuNotificationSystem.Singletons;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.EntityFrameworkCore;

using System.Linq;

namespace BackUrfuNotificationSystem.Services;

public class NotifyService(ILogger<NotifyService> logger, IServiceScopeFactory scopeFactory, NotifyManager notifyManager) : BackgroundService {
  private readonly ILogger<NotifyService> _logger = logger;
  private readonly NotifyManager _notifyManager = notifyManager;

  private bool _firstStart = true;

  protected override async Task ExecuteAsync(CancellationToken stoppingToken) {
    while (!stoppingToken.IsCancellationRequested) {
      var updates = _notifyManager.GetUpdates();
      var dictionary = new Dictionary<string, byte[]>();

      if (updates.Count == 0 && !_firstStart) {
        await Task.Delay(1000, stoppingToken);
        continue;
      }

      if (!_firstStart) {
        _logger.LogInformation("Receieved update type: {}.", updates.Last());
      }

      _firstStart = false;

      using var scope = scopeFactory.CreateScope();
      using var databaseContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

      var doc = databaseContext.Documents.OrderBy(x => x.UploadTime).LastOrDefault();

      if (doc == null) {
        _logger.LogWarning("Database does not has any notify template.");
        continue;
      }

      var wordFileData = doc.Data;


      using var finalStream = new MemoryStream();
      using var finalDoc = WordprocessingDocument.Create(finalStream, DocumentFormat.OpenXml.WordprocessingDocumentType.Document, false);

      var mainPart = finalDoc.AddMainDocumentPart();
      mainPart.Document = new Document();

      var finalBody = mainPart.Document.AppendChild(new Body());

      var docs = new List<(string name, byte[] data)>();

      foreach (var oweder in databaseContext.Students.Filter(x => x.AmountOfDebt > 0).Include(x => x.Agreement).Include(x => x.Group).Include(x => x.Institute)) {
        using var memoryStream = new MemoryStream();

        await memoryStream.WriteAsync(doc.Data, stoppingToken);

        memoryStream.Position = 0;

        using var wordDoc = WordprocessingDocument.Open(memoryStream, true);
        var body = wordDoc.MainDocumentPart?.Document.Body;

        if (body == null) {
          _logger.LogCritical("Word body is null.");

          continue;
        }

        foreach (var para in body.Elements<Paragraph>()) {
          foreach (var run in para.Elements<Run>()) {
            foreach (var text in run.Elements<DocumentFormat.OpenXml.Wordprocessing.Text>()) {
              if (text.Text.Contains(".ФИО.")) {
                text.Text = text.Text.Replace(".ФИО.", $"{oweder.FirstName} {oweder.Surname} {oweder.LastName}");
              }
              if (text.Text.Contains(".НОМЕР-ДОГОВОРА.")) {
                text.Text = text.Text.Replace(".НОМЕР-ДОГОВОРА.",
#if DEBUG
                oweder.Agreement.Number.Remove(oweder.Agreement.Number.Length - 5, 5) + new string('*', 5)
#else
                oweder.Agreement.Number
#endif
                );
              }
              if (text.Text.Contains(".СУММА-ДОЛГА.")) {
                text.Text = text.Text.Replace(".СУММА-ДОЛГА.", oweder.AmountOfDebt.ToString());
              }
              if (text.Text.Contains(".ПОЧТА.")) {
                text.Text = text.Text.Replace(".ПОЧТА.", oweder.Email);
              }
              if (text.Text.Contains(".НОМЕР-ТЕЛЕФОНА.")) {
                text.Text = text.Text.Replace(".НОМЕР-ТЕЛЕФОНА.", oweder.PhoneNumber);
              }
              if (text.Text.Contains(".ГРУППА.")) {
                text.Text = text.Text.Replace(".ГРУППА.", oweder.Group.ToString());
              }
            }
          }
        }

        if (finalBody.HasChildren) {
          finalBody.AppendChild(new Paragraph(new Run(new Break() {
            Type = BreakValues.Page
          })));
        }

        foreach (var para in body.Elements<Paragraph>()) {
          finalBody.AppendChild(new Paragraph() {
            InnerXml = para.InnerXml
          });
        }
        using var tempStream = new MemoryStream();

        wordDoc.Clone(tempStream);

        dictionary.Add(oweder.Agreement.Number, tempStream.ToArray());

        _logger.LogInformation("Created new notify for student: {} {} {}", oweder.FirstName, oweder.Surname, oweder.LastName);
      }
      finalDoc.Clone(finalStream);

      _notifyManager.Doc = finalStream.ToArray();
      _notifyManager.Docs = dictionary;
    }
  }
}