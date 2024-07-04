using System.Reflection;
using BackUrfuNotificationSystem.Models;
using BackUrfuNotificationSystem.Models.API;
using BackUrfuNotificationSystem.Models.Excel;
using BackUrfuNotificationSystem.Singletons;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sylvan.Data.Excel;

namespace BackUrfuNotificationSystem.Controllers;

[ApiController]
[Route("api/files")]
public class FilesController(ILogger<FilesController> logger, DatabaseContext databaseContext, NotifyManager notifyManager) : ControllerBase {
  private readonly ILogger<FilesController> _logger = logger;
  private readonly DatabaseContext _databaseContext = databaseContext;

  [HttpPost("upload_word_template")]
  public async Task<FileUploadResponse> UploadWordTemplate(List<IFormFile> files) {
    foreach (var file in files) {
      using var stream = file.OpenReadStream();
      using var memStream = new MemoryStream();

      stream.CopyTo(memStream);

      await _databaseContext.Documents.AddAsync(new() {
        Name = file.FileName,
        UploadTime = DateTime.UtcNow,
        Data = memStream.ToArray()
      });

      _logger.LogInformation("File '{}' with size '{}' was saved to database.", file.FileName, memStream.Length);
    }

    await _databaseContext.SaveChangesAsync();

    notifyManager.AddUpdate(new Update() {
      UpdateType = UpdateType.TemplateUploaded
    });

    return new();
  }

  [HttpPost("upload_owed_students")]
  public async Task<FileUploadResponse> UploadOwedStudents(List<IFormFile> files) {
    if (files.Count == 0) {
      Response.StatusCode = (int)System.Net.HttpStatusCode.BadRequest;

      _logger.LogWarning("'{}' was received request with empty file list.", nameof(UploadOwedStudents));

      return new() {
        Text = "You should attach the file.",
      };
    }

    var answer = await ReadFiles<OwedStudent>(files, async (o) => {
      if (await _databaseContext.Agreements.Include(x => x.Student).FirstOrDefaultAsync(x => x.Number == o.AgreementNumber) is Agreement agreement) {
        agreement.Student.AmountOfDebt = int.TryParse(o.AmountOfDebt, out int r) ? r : 0;

        var payLog = new PayLog() {
          AmountOfDebt = agreement.Student.AmountOfDebt,
          ExpectedPay = 0,
          LogTime = DateTime.UtcNow,
          Student = agreement.Student
        };


        agreement.PaymentHistory ??= [];


        agreement.PaymentHistory.Add(payLog);
        _databaseContext.Agreements.Update(agreement);
        _databaseContext.Students.Update(agreement.Student);

        await _databaseContext.PayLogs.AddAsync(payLog);
      }
    });

    if (answer == null) {
      await _databaseContext.SaveChangesAsync();
      notifyManager.AddUpdate(new Update() {
        UpdateType = UpdateType.TemplateUploaded
      });
    } else {
      Response.StatusCode = (int)System.Net.HttpStatusCode.BadRequest;
      _databaseContext.ChangeTracker.Clear();
    }

    return answer ?? new();
  }

  [HttpPost("upload_students_general_info")]
  public async Task<FileUploadResponse> UploadStudentsGeneralInfo(List<IFormFile> files) {
    if (files.Count == 0) {
      Response.StatusCode = (int)System.Net.HttpStatusCode.BadRequest;

      _logger.LogWarning("'{}' was received request with empty file list.", nameof(UploadOwedStudents));

      return new() {
        Text = "You should attach the file.",
      };
    }

    var answer = await ReadFiles<StudentGeneral>(files, async (o) => {
      string Substr(string? name) {
#if DEBUG
        return name == null ? "undefined" : name.Length > 3 ? string.Concat(name.AsSpan(0, 3), new string('*', name.Length - 3)) : name;
#else
        return name;
#endif
      }

      var amountOfDebt = .0;

      if (_databaseContext.Agreements.FirstOrDefault(x => x.Number == o.AgreementNumber) is Agreement agreement) {
        _databaseContext.Agreements.Remove(agreement);
      }
      if (_databaseContext.Students.FirstOrDefault(x => x.Agreement.Number == o.AgreementNumber) is Student student) {
        amountOfDebt = student.AmountOfDebt;
        _databaseContext.Students.Remove(student);
      }

      var currentYearLastNumber = DateTime.Now.Year % 10;
      var groupYearLastNumber = int.Parse([o.Group.Split('-')[1][1]]);

      var group = new Group() {
        Prefix = o.Group.Split('-')[0],
        YearOfAdmission = currentYearLastNumber >= groupYearLastNumber ?
                                                   (DateTime.Now.Year - DateTime.Now.Year % 10) + groupYearLastNumber :
                                                   (DateTime.Now.Year - DateTime.Now.Year % 10) - 10 + groupYearLastNumber,
        Shifr = o.Group.Substring(o.Group.Length - 4, 4)
      };
      var newStudent = new Student() {
        Group = group,
        Institute = _databaseContext.Institutes.First(),
      };
      var newAgreement = new Agreement();

      var fio = o.FullName.Split(' ');

      newStudent.FirstName = fio.Length > 1 ? fio[1] : string.Empty;
      newStudent.Surname = fio.Length > 2 ? fio[2] : string.Empty;
      newStudent.LastName = fio.Length > 0 ? fio[0] : string.Empty;

      newStudent.PhoneNumber = o.PhoneNumber;
      newStudent.Email = o.Email;

      newAgreement.Student = newStudent;
      newAgreement.Number = o.AgreementNumber;


      newStudent.FirstName = Substr(newStudent.FirstName);
      newStudent.LastName = Substr(newStudent.LastName);
      newStudent.Surname = Substr(newStudent.Surname);
      newStudent.Email = Substr(newStudent.Email);
      newStudent.PhoneNumber = Substr(newStudent.PhoneNumber);

      newStudent.AmountOfDebt = amountOfDebt;

      await _databaseContext.AddAsync(group);
      await _databaseContext.AddAsync(newAgreement);
      await _databaseContext.AddAsync(newStudent);
    });

    if (answer == null) {
      await _databaseContext.SaveChangesAsync();

      notifyManager.AddUpdate(new Update() {
        UpdateType = UpdateType.TemplateUploaded
      });

    } else {
      Response.StatusCode = (int)System.Net.HttpStatusCode.BadRequest;
      _databaseContext.ChangeTracker.Clear();
    }



    return answer ?? new();
  }

  private async Task<FileUploadResponse?> ReadFiles<T>(List<IFormFile> files, Func<T, Task> upload) {
    for (var i = 0; i < files.Count; i++) {
      ExcelDataReader edr = await ExcelDataReader.CreateAsync(files[i].OpenReadStream(), ExcelWorkbookType.ExcelXml);
      int row = -1;

      do {
        var sheetName = edr.WorksheetName;
        // enumerate rows in current sheet.
        while (edr.Read()) {
          // iterate cells in row.
          // can use edr.RowFieldCount when sheet contains jagged, non-rectangular data

          row++;
          T studentGeneral = Activator.CreateInstance<T>() ?? throw new();
          var props = studentGeneral.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public);
          for (int j = 0; j < edr.FieldCount; j++) {
            if (j >= props.Length) {
              continue;
            }
            try {
              props[j].SetValue(studentGeneral, edr.GetString(j));
            } catch {
              return new() {
                Row = row,
                Column = j,
                Text = "Failed to pasrse file.",
                FileIndex = i,
              };
            }
          }

          await upload(studentGeneral);
          // Can use other strongly-typed accessors
          // bool flag = edr.GetBoolean(0);
          // DateTime date = edr.GetDateTime(1);
          // decimal amt = edr.GetDecimal(2);
        }
        // iterates sheets
      } while (edr.NextResult());
    }

    return null;
  }
}