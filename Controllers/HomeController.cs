using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PcWebsite.Database.Entities;

namespace PcWebsite.Controllers;

[Route("/api/computers")]
[ApiController]
public class HomeController : ControllerBase
{
    [HttpGet]
    public List<Computer> GetComputers()
    {
        using var db = new Database.Database();
        return db.Computers.Include(c => c.Parts).OrderBy(c => c.Price).ToList();
    }

    [HttpPost]
    public IActionResult UpdateComputers([FromHeader] string username, [FromHeader] string password, [FromBody] List<ComputerDto> computers)
    {
        using var db = new Database.Database();
        var user = db.Users.FirstOrDefault(u => u.Name == username && u.Password == CreateSHA512(password));
        if(user == null)
            return StatusCode(403, "Błędne dane logowania");
        db.Database.ExecuteSqlRaw("DELETE FROM Computers");
        foreach (var data in computers)
        {
            var parts = new List<Part>();
            foreach (var partData in data.Parts)
            {
                var part = new Part(partData.Name, partData.About, partData.Category, partData.Price, partData.Photo);
                parts.Add(part);
            }
            var computer = new Computer(data.Name, data.About);
            computer.UpdateParts(parts);
            db.Computers.Add(computer);
        }
        db.SaveChanges();
        return Ok("Zaktualizowano dane");
    }

    [HttpGet]
    [Route("/api/user")]
    public IActionResult CreateUser([FromQuery] string username,[FromQuery] string password,[FromQuery] string? otherUsername = "",[FromQuery] string? otherPassword = "")
    {
        if(password.Length < 8)
            return BadRequest("Password must have at least 8 characters");
        using (var db = new Database.Database())
        {
            if (!db.Users.Any())
            {
                db.Users.Add(new User{Name = username, Password = CreateSHA512(password)});
                db.SaveChanges();
                return Ok("Created user");
            }
            var user = db.Users.FirstOrDefault(u => u.Name == otherUsername && u.Password == CreateSHA512(otherPassword));
            if(user == null)
                return StatusCode(403, "Invalid credentials");
            db.Users.Add(new User{Name = username, Password = CreateSHA512(password)});
            db.SaveChanges();
            return Ok("Created user");
        }
    }

    public class ComputerDto
    {
        public string Name { get; set; } = "";
        public string About { get; set; } = "";
        public List<PartDto> Parts { get; set; } = new List<PartDto>();
    }

    public class PartDto
    {
        public string Category { get; set; } = "";
        public string Name { get; set; } = "";
        public string About { get; set; } = "";
        public int Price { get; set; } = 0;
        public string Photo { get; set; } = "";
    }
    
    public string CreateSHA512(string strData)
    {
        var message = Encoding.UTF8.GetBytes(strData);
        using (var alg = SHA512.Create())
        {
            string hex = "";

            var hashValue = alg.ComputeHash(message);
            foreach (byte x in hashValue)
            {
                hex += String.Format("{0:x2}", x);
            }
            return hex;
        }
    }
}