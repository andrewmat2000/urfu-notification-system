using BackUrfuNotificationSystem;
using BackUrfuNotificationSystem.Extensions;
using BackUrfuNotificationSystem.Services;
using BackUrfuNotificationSystem.Singletons;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMvc(x => x.EnableEndpointRouting = false);
builder.Services.AddSwaggerGen(x => x.SwaggerDoc("v1", new() { Title = "Система уведомлений студентов о задолженности", Version = "v1" }));

builder.Services.AddSingleton<NotifyManager>();
builder.Services.AddHostedService<NotifyService>();

Npgsql.NpgsqlConnectionStringBuilder npgsqlConnectionStringBuilder = new() {
  Host = Environment.GetEnvironmentVariable("POSTGRES_HOST"),
  Database = Environment.GetEnvironmentVariable("POSTGRES_DB"),
  Password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD"),
  Username = Environment.GetEnvironmentVariable("POSTGRES_USER")
};

builder.Services.AddDbContext<DatabaseContext>(x => x.UseNpgsql(npgsqlConnectionStringBuilder.ConnectionString));

var app = builder.Build();

app.UseStaticFiles();

#if DEBUG
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

await app.SeedDatabase();
#else
using var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
using var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

if (!dbContext.Institutes.Any()) {
  dbContext.Institutes.Add(new() {
    Name = "ИРИТ-РТФ"
  });

  await dbContext.SaveChangesAsync();
}
#endif


app.UseMvc();

#if DEBUG
app.UseSwagger();
app.UseSwaggerUI(c => {
  c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
  c.RoutePrefix = "swagger";
});
#endif

app.UseSpa(x => {
  x.Options.SourcePath = "wwwroot";

#if DEBUG
  x.UseProxyToSpaDevelopmentServer(Environment.GetEnvironmentVariable("DEV_SERVER_URL") ?? "http://localhost:3000");
#endif

});

app.Run();
