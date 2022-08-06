namespace PcWebsite.Database.Entities;

public class Computer
{
    public int ComputerId { get; set; }
    public string Name { get; set; }
    public string About { get; set; }
    public int Price { get; set; }
    public List<Part>? Parts { get; set; } = new List<Part>();

    private int CalculatePrice()
    {
        int price = 0;
        foreach (var part in this.Parts)
        {
            price += part.Price;
        }

        return price;
    }

    public Computer(string name, string about)
    {
        this.Name = name;
        this.About = about;
    }

    public void UpdateParts(List<Part>? parts = null)
    {
        if(parts != null)
            this.Parts = parts;
        this.Price = this.CalculatePrice();
    }
}