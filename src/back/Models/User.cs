namespace BackUrfuNotificationSystem.Models;
public class User : DbModel {
  public string FirstName { get; set; } = null!;
  public string SecondName { get; set; } = null!;
  public string Surname { get; set; } = null!;
  public string Email { get; set; } = null!;
  public string Phone { get; set; } = null!;
  public User? WhoCreated { get; set; } = null;
}