using BackUrfuNotificationSystem.Models;

namespace BackUrfuNotificationSystem.Extensions;

public static class DbSeedExtension {
#if DEBUG
  public static async Task<WebApplication> SeedDatabase(this WebApplication app) {
    using var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

    dbContext.Clear();

    Institute institute = new() {
      Name = "ИРИТ-РТФ"
    };

    EducationalProgram educationalProgram = new() {
      Institute = institute,
      Name = "РУПП"
    };

    dbContext.Institutes.Add(new() {
      Name = "ИРИТ-РТФ"
    });

    dbContext.Groups.Add(new() {
      Prefix = "РИМ",
      Shifr = "0990",
      YearOfAdmission = 2022,
      Program = educationalProgram
    });

    dbContext.Groups.Add(new() {
      Prefix = "РИМ",
      Shifr = "0990",
      YearOfAdmission = 2023,
      Program = educationalProgram
    });

    await dbContext.SaveChangesAsync();

    Student[] students = [
      new() {
        FirstName = "Андрей",
        Surname = "Александрович",
        LastName = "Матвеев",
        Email = "sample@mail.ru",
        Institute = dbContext.Institutes.First(),
        Group = dbContext.Groups.First(),
      // NumberOfAgreement = "4124523412434512",
        PhoneNumber = "88005553535",
      },
      new() {
        FirstName = "Дмитрий",
        Surname = "Алексеевич",
        LastName = "Чечихин",
        Email = "sample@mail.ru",
        Institute = dbContext.Institutes.First(),
        Group = dbContext.Groups.OrderByDescending(x => x.Id).First(),
        // NumberOfAgreement = "4124523412434512",
        PhoneNumber = "88005553535",
      }
    ];

    User[] users = [
      new() {
        FirstName = "Иван",
        SecondName = "Иванович",
        Surname = "Иванов",
        Email = "asd@mail.ru",
        Phone = "90412412"
      }
    ];

    Agreement[] agreements = [
      new() {
        IsSelfPay = true,
        Number = "#11",
        Student = students[0],
      },
      new() {
        IsSelfPay = true,
        Number = "#22",
        Student = students[1],
      }
    ];

    PayLog[] payLogs = [
      new() {
        AmountOfDebt = 0,
        ExpectedPay = 50000,
        LogTime = DateTime.UtcNow,
        Student = students[0]
      },
      new() {
        AmountOfDebt = 5000,
        ExpectedPay = 50000,
        LogTime = DateTime.UtcNow,
        Student = students[1]
      }
    ];

    ActionLog[] actionLogs = [
      new() {
        Description = "что то там где то там",
        User =  users[0]
      }
    ];

    agreements[0].PaymentHistory = [payLogs[0]];
    agreements[1].PaymentHistory = [payLogs[1]];
    students[0].AgreementId = agreements[0].Id;
    students[1].AgreementId = agreements[1].Id;

    dbContext.Agreements.AddRange(agreements);
    dbContext.Students.AddRange(students);
    dbContext.PayLogs.AddRange(payLogs);
    dbContext.Users.AddRange(users);
    dbContext.ActionLogs.AddRange(actionLogs);

    await dbContext.SaveChangesAsync();

    return app;
  }
#endif
}