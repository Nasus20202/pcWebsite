using PcWebsite.Database;
using PcWebsite.Database.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapControllerRoute(
    name: "api",
    pattern: "api/{controller=Home}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

using (var db = new Database())
{
    db.Database.EnsureCreated();
    /*var comp = new Computer("Komputer do gier", "Komputer dla gracza");
    var parts = new List<Part>();
    parts.Add(new Part("Intel Core i5 12600K", "Procesor", "CPU", 164900, "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/10/pr_2021_10_26_7_31_43_884_00.jpg"));
    parts.Add(new Part("Nvidia Geforce RTX 3060 ", "Karta graficzna", "GPU", 199900));
    comp.UpdateParts(parts);
    var comp2 = new Computer("Komputer do gier 2", "Komputer dla gracza 2");
    var parts2 = new List<Part>();
    parts2.Add(new Part("AMD Ryzen 9 5900X", "Procesor", "CPU", 194900, "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/10/pr_2020_10_9_13_56_59_540_00.jpg"));
    parts2.Add(new Part("AMD Radeon RX 6800XT", "Karta graficzna", "GPU", 389900));
    comp2.UpdateParts(parts2);
    db.Computers.Add(comp); db.Computers.Add(comp2);
    db.SaveChanges();*/
}

app.Run();