using AppSolidarIT_Angular.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Reporting.Map.WebForms.BingMaps;
using System.Net;

namespace AppSolidarIT_Angular.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly PortfolioDbfirstContext _context;

        public ProductController(PortfolioDbfirstContext context)
        {
            _context = context;
        }

        [HttpGet()]
        public IEnumerable<Product> GetAllProducts()
        {
            return _context.Products;

        }

        [HttpGet("{Id}")]

        public ActionResult<Product> GetDetails(int Id)
        {
           

            var product = _context.Products?.Find(Id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        
        }

        [HttpPost]
        public void CreateProduct(Product product)
        {
            //try
            //{

            //}
            //catch (Exception ex)
            //{

            //}
            _context.Products.Add(product);
            _context.SaveChanges();
        }

        [HttpPut]
        public void UpdateProduct(Product product)
        {

            _context.Products.Remove(product);
            _context.SaveChanges();
        }

        [HttpDelete]

        public void DeleteProduct(Product product)
        {

            _context.Products.Remove(product);
            _context.SaveChanges();
        }


    }
}
// put : modifie