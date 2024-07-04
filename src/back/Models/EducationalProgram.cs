using BackUrfuNotificationSystem.Models;

namespace BackUrfuNotificationSystem;

public class EducationalProgram : DbModel {
  public string Name { get; set; } = null!;
  public Institute Institute { get; set; } = null!;
}