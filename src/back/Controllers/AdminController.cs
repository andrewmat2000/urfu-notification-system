using BackUrfuNotificationSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackUrfuNotificationSystem.Controllers;

[ApiController]
[Route("api/paylog")]
public class AdminController(DatabaseContext databaseContext) : ControllerBase {
  private readonly DatabaseContext _databaseContext = databaseContext;

  [HttpGet("get_by_user_id")]
  public ActionResult<ActionLog[]> GetActionLogsByUserId(int userId) {
    if (_databaseContext.ActionLogs.Include(x => x.User).Where(x => x.User.Id == userId) is not IQueryable<ActionLog> actionLogs) {
      return NotFound();
    }

    return actionLogs.ToArray();
  }

  [HttpGet("get_all_actions")]
  public ActionResult<ActionLog[]> GetAllActionLogs() {
    return _databaseContext.ActionLogs.Include(x => x.User).ToArray();
  }
}