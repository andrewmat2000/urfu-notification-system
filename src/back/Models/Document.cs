namespace BackUrfuNotificationSystem.Models.Word;

public class Document : DbModel {
  public string Name { get; set; } = null!;
  public DateTime UploadTime { get; set; }
  public byte[] Data { get; set; } = null!;
}