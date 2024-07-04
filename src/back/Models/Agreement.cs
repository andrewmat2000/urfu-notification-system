namespace BackUrfuNotificationSystem.Models;

public class Agreement : DbModel {
  public string Number { get; set; } = null!;
  public Student Student { get; set; } = null!;
  public bool IsSelfPay { get; set; }
  public Payer? Payer { get; set; }
  public ICollection<PayLog> PaymentHistory { get; set; } = null!;
}
