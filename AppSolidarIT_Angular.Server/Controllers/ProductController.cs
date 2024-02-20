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

        /// <summary>
        ///     Récupère tout les products
        /// </summary>
        /// <returns>Et bien des products, non ?</returns>
        /// GET: api/<ProductsController>
        [HttpGet()]
        public IEnumerable<Product> GetAllProducts()
        {
            return _context.Products;
        }

        /// <summary>
        ///     Récupère un product à partir de son identifiant
        /// </summary>
        /// <returns></returns>
        /// GET api/<ProductsController>/5
        [HttpGet("{ThemeId}")]
        public ActionResult<Product> GetDetails(int ThemeId)
        {   
    

            var product = _context.Products?.FirstOrDefault(p => p.ThemeId == ThemeId); // find en cherchant sur themeid
            if (product == null)
            {
                return NotFound("Aie aie aie, non trouvé!");
            }
            return Ok(product);
        }

       

        /// <summary>
        ///     Création d'un nouveau produit
        /// </summary>
        /// POST api/<ProductsController>
        [HttpPost()]
        public ActionResult CreateProduct( Product product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Products.Add(product);
                    _context.SaveChanges();
                    
                } else{
            // Handle the case where _context is null
                    ModelState.AddModelError("", "Context is null or ModelState is not valid");
                }
                

            }
            catch (DataException)
            {
                ModelState.AddModelError("", "Impossible de créer le produit , verifier les conditions et essayez encore");
            }
            return Ok(product);
        }

        /// <summary>
        ///     Mise à jour d'un product
        /// </summary>
        /// <returns>Rien</returns>
        /// PUT api/<ProductsController>/5
        [HttpPut("{id}")]
        public ActionResult PutProduct(Product product)
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




        /// <summary>
        ///     On supprime un product
        /// </summary>
        /// <returns>Rien</returns>
        /// DELETE api/<BirdsController>/5
        [HttpDelete("{id}")]
        public ActionResult DeleteProduct(Product product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Products.Remove(product);
                    _context.SaveChanges();
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
