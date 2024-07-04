using System.Text.Json.Serialization;

namespace BackUrfuNotificationSystem.Models.API;

public class SendNotificationsRequest {
  public string Login { get; set; } = null!;
  public string Password { get; set; } = null!;
  public string? MessageTitle { get; set; }
  public string? MessageText { get; set; }
  public ICollection<IFormFile> Files { get; set; } = [];
}
