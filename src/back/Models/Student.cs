using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackUrfuNotificationSystem.Models;

public class Student : DbModel {
  public string FirstName { get; set; } = "";
  public string? PhoneNumber { get; set; }
  public string? Email { get; set; }
  public string? Surname { get; set; }
  public string LastName { get; set; } = "";
  public double AmountOfDebt { get; set; }
  [NotMapped]
  public DateTime LastPayTime { get; set; }
  public Group Group { get; set; } = null!;
  public Institute Institute { get; set; } = null!;
  public string NumberOfAgreement => Agreement.Number;
  [JsonIgnore]
  public int AgreementId { get; set; }
  [JsonIgnore]
  [ForeignKey(nameof(AgreementId))]
  public Agreement Agreement { get; set; } = null!;
}