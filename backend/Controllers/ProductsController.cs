using DotnetBackend.Data;
using DotnetBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ProductsController: ControllerBase
{
    private readonly AppDbContext _db;
    public ProductsController(AppDbContext db) => _db = db;

    // GET /api/products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> Get() =>
        await _db.Products.AsNoTracking().ToListAsync();
}