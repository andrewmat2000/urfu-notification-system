using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackUrfuNotificationSystem.Models;

public class Group : DbModel {
  [NotMapped]
  public string Name => ToString();
  [JsonIgnore]
  public string Prefix { get; set; } = null!;
  [JsonIgnore]
  public int YearOfAdmission { get; set; }
  [JsonIgnore]
  public string Shifr { get; set; } = null!;
  public EducationalProgram? Program { get; set; }
  private int GetYearOfStudy() {
    return DateTime.UtcNow.Year - YearOfAdmission + (DateTime.UtcNow.Month >= 9 ? 1 : 0);
  }

  public override string ToString() {
    return string.Format("{0}-{1}{2}{3}", Prefix, GetYearOfStudy(), YearOfAdmission % 10, Shifr);
  }
}