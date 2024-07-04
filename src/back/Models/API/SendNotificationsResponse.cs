namespace BackUrfuNotificationSystem.Models.API;

public class NotificationReceiver {
  public string FullName { get; set; } = null!;
  public string Email { get; set; } = null!;
}

public enum ReceiveError {
  StudentNotFound,
  AgreementNumberNotFound,
}



public class NotificationReceiverResult {
  public int DocumentNumber { get; set; }
  public int PageNumber { get; set; }
  public NotificationReceiver Receiver { get; set; } = null!;
}

public class ReceiveErrorResult {
  public int DocumentNumber { get; set; }
  public int PageNumber { get; set; }
  public ReceiveError Error { get; set; }
}

public class SendNotificationsResponse {
  public int AmountOfPages { get; set; } = 0;
  public List<NotificationReceiverResult> MessagesSended { get; set; } = [];
  public List<ReceiveErrorResult> PagesError { get; set; } = [];
}