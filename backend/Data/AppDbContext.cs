using Microsoft.EntityFrameworkCore;
using DotnetBackend.Models;

namespace DotnetBackend.Data;

public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Phone", Price = 699m },
            new Product { Id = 2, Name = "Laptop", Price = 1299m }
        );
        
        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
            entity.SetTableName(entity.GetTableName()!.ToLower());
        }
    }
}