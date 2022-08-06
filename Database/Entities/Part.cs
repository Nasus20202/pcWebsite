namespace PcWebsite.Database.Entities;

public class Part
{
    public int PartId { get; set; }
    public string Category { get; set; }
    public string Name { get; set; }
    public string About { get; set; }
    public int Price { get; set; }
    public string Photo { get; set; }
    
    public int ComputerId { get; set; }

    public Part(string name, string about, string category, int price, string photo = "")
    {
        this.Name = name;
        this.About = about;
        this.Category = category;
        this.Price = price;
        this.Photo = photo;
    }
}