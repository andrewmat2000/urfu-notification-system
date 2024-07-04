using BackUrfuNotificationSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackUrfuNotificationSystem.Controllers;

[ApiController]
[Route("api/paylog")]
public class PayLogController(DatabaseContext databaseContext) : ControllerBase {
  private readonly DatabaseContext _databaseContext = databaseContext;

  [HttpGet("get_by_student_id")]
  public ActionResult<PayLog[]> GetPaylogs(int studentId) {
    // return _databaseContext.PayLogs.ToArray();
    // var a = _databaseContext.PayLogs.Include(x => x.Student);
    if (_databaseContext.PayLogs.Include(x => x.Student).Include(x => x.Student.Agreement).Where(x => x.Student.Id == studentId) is not IQueryable<PayLog> payLogs) {
      return NotFound();
    }
    return payLogs.ToArray();
  }
}