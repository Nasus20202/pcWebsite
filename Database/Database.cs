using System;
using System.Collections.Generic;
using PcWebsite.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace PcWebsite.Database;

public class Database : DbContext
{
    public DbSet<Computer> Computers { get; set; }
    public DbSet<Part> Parts { get; set; }
    public DbSet<User> Users { get; set; }

    public string DbPath { get; set; }

    public Database()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "computers.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}