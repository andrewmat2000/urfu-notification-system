namespace BackUrfuNotificationSystem.Models;

public enum NotifyLogType {
  Send,
  Read,
  Printed
}

public class NotifyLog {
  public DateTime SendTime { get; set; }
  public NotifyLogType LogType { get; set; }
}