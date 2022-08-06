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
        if (username == "nasus" && password == "nasus")
        {
            using (var db = new Database.Database())
            {
                db.Database.ExecuteSqlRaw("TRUNCATE TABLE COMPUTERS");
                foreach (var data in computers)
                {
                    var computer = new Computer(data.Name, data.About);
                    var parts = new List<Part>();
                    foreach (var part in data.Parts)
                    {
                        parts.Add(new Part(part.Name, part.About, part.Category, part.Price, part.Photo));
                    }
                    computer.UpdateParts(parts);
                }
                db.SaveChanges();
                return Ok(db.Computers.Include(c => c.Parts));
            }
        }
        else
        {
            return Forbid();
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
}