namespace BackUrfuNotificationSystem.Models;

public class PayLog : DbModel {
  public Student Student { get; set; } = null!;
  public int ExpectedPay { get; set; }
  public double AmountOfDebt { get; set; }
  public DateTime LogTime { get; set; }
}