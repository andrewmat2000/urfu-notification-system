namespace BackUrfuNotificationSystem.Models;

public enum InsertDataType {
  Name,
  NumberOfAgreement,
  DateOfAgreement,
  AmountOfDebt,
  NumberOfLastNotify,
  DateOfLastNotify,
}

public class NotyfyTemplate {
  public string Template { get; set; } = null!;
  public InsertDataType[] InsertDataArray { get; set; } = [];
}