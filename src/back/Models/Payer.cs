namespace BackUrfuNotificationSystem.Models;

public class Payer : DbModel {
  public string FirstName { get; set; } = null!;
  public string? PhoneNumber { get; set; }
  public string? Email { get; set; }
  public string? SurnameName { get; set; }
  public string LastName { get; set; } = null!;
}