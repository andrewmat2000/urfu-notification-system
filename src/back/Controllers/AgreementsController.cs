using BackUrfuNotificationSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackUrfuNotificationSystem.Controllers;

[ApiController]
[Route("api/agreements")]
public class AgreementsController(DatabaseContext databaseContext) : ControllerBase {
  private readonly DatabaseContext _databaseContext = databaseContext;

  [HttpGet("get_by_student_id")]
  public ActionResult<Agreement> GetAgreement(int studentId) {
    string Substr(string? name) {
#if DEBUG
      return name == null ? "..." : name.Length > 3 ? name.Substring(0, 3) : name;
#else
      return name;
#endif
    }

    if (_databaseContext.Agreements.Include(x => x.Student).FirstOrDefault(x => x.Student.Id == studentId) == null) {
      return NotFound();
    }
    var agreement = _databaseContext.Agreements.Include(x => x.Student).Include(x => x.PaymentHistory).Include(x => x.Payer).Include(x => x.Student.Group).Include(x => x.Student.Group.Program).Include(x => x.Student.Institute).First(x => x.Student.Id == studentId);

    agreement.Student.AmountOfDebt = agreement.PaymentHistory.LastOrDefault()?.AmountOfDebt ?? 0;
    agreement.Student.LastPayTime = agreement.PaymentHistory.LastOrDefault()?.LogTime ?? DateTime.MinValue;

    agreement.Number = Substr(agreement.Number);
    agreement.Student.FirstName = Substr(agreement.Student.FirstName);
    agreement.Student.Surname = Substr(agreement.Student.Surname);
    agreement.Student.LastName = Substr(agreement.Student.LastName);
    agreement.Student.PhoneNumber = Substr(agreement.Student.PhoneNumber);
    agreement.Student.Email = Substr(agreement.Student.Email);

    return agreement;
  }
}