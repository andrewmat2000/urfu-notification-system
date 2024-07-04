using System.Reflection;
using BackUrfuNotificationSystem.Models;
using BackUrfuNotificationSystem.Models.Word;
using Microsoft.EntityFrameworkCore;

namespace BackUrfuNotificationSystem;

public class DatabaseContext : DbContext {
  public virtual DbSet<ActionLog> ActionLogs { get; set; } = null!;
  public virtual DbSet<Agreement> Agreements { get; set; } = null!;
  public virtual DbSet<EducationalProgram> EducationalPrograms { get; set; } = null!;

  public virtual DbSet<Group> Groups { get; set; } = null!;
  public virtual DbSet<Institute> Institutes { get; set; } = null!;
  public virtual DbSet<Payer> Payers { get; set; } = null!;
  public virtual DbSet<PayLog> PayLogs { get; set; } = null!;
  public virtual DbSet<Student> Students { get; set; } = null!;
  public virtual DbSet<User> Users { get; set; } = null!;
  public virtual DbSet<Document> Documents { get; set; } = null!;

  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    base.OnModelCreating(modelBuilder);
  }
#if DEBUG
  public void Clear() {
    using var connection = new Npgsql.NpgsqlConnection(Database.GetConnectionString());
    connection.Open();

    foreach (var prop in GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public)) {

      if (prop.PropertyType.Name.StartsWith("DbSet")) {
        using var com = new Npgsql.NpgsqlCommand() {
          CommandText = $"drop table if exists \"{prop.Name}\" cascade;",
          Connection = connection
        };
        com.ExecuteNonQuery();
      }
    }

    Database.EnsureCreated();
  }
#endif

  public DatabaseContext(DbContextOptions<DatabaseContext> dbContextOptions) : base(dbContextOptions) {
    Database.EnsureCreated();
  }
}