using System.Reflection;
using BackUrfuNotificationSystem.Models;
using BackUrfuNotificationSystem.Models.API;
using BackUrfuNotificationSystem.Models.Excel;
// using LanguageExt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sylvan.Data.Excel;

namespace BackUrfuNotificationSystem.Controllers;

[ApiController]
[Route("api/students")]
public class StudentsController(DatabaseContext databaseContext) : ControllerBase {
  private readonly DatabaseContext _databaseContext = databaseContext;

  [HttpGet("get_list")]
  public async Task<Student[]> GetStudents() {
    return await _databaseContext.Students
      .Include(x => x.Group)
      .Include(x => x.Institute)
      .Include(x => x.Agreement)
      .Include(x => x.Group.Program)
      .OrderByDescending(x => x.AmountOfDebt)
      .ToArrayAsync();
  }
}