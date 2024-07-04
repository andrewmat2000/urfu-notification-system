namespace BackUrfuNotificationSystem.Models;

public class ActionLog : DbModel {
  public User User { get; set; } = null!;
  public string Description { get; set; } = null!;
}