using AppSolidarIT_Angular.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Reporting.Map.WebForms.BingMaps;
using System.Data;


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
        public ActionResult CreateProduct([Bind(include: "Label, Theme, DescriptionShort, DescriptionLong")] Product product)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    _context.Products.Add(product);
                    _context.SaveChanges();
                    
                }
            }
            catch (DataException)
            {
                ModelState.AddModelError("", "Impossible de créer le produit, verifier les conditions et essayez encore");
            }
            return Ok(product);
        }

        [HttpPut]
        public ActionResult UpdateProduct([Bind(include: "Label, Theme, DescriptionShort, DescriptionLong")] Product product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Products.Update(product);
                    _context.SaveChanges();
                    
                }
            }
            catch (DataException)
            {
                ModelState.AddModelError("", "Impossible de mettre à jour le produit, verifier les conditions et essayez encore");
            }
            return Ok(product);
        }

        [HttpDelete]

        public ActionResult DeleteProduct(Product product)
        {


            try
            {
                if (ModelState.IsValid)
                    {
                    _context.Products.Remove(product);
                    _context.SaveChanges();
                    //return RedirectToAction("Home");

                }
            }
            catch (DataException)
            {
                ModelState.AddModelError("", "Impossible de supprimer le produit");
            }
            return Ok(product);
        }


    }
}
// put : modifie