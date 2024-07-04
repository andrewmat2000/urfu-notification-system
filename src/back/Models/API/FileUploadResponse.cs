using System.Net;

namespace BackUrfuNotificationSystem.Models.API;

public class FileUploadResponse {
  public int? FileIndex { get; set; }
  public string? Text { get; set; }
  public int? Row { get; set; }
  public int? Column { get; set; }
  public string? Reason { get; set; }
}