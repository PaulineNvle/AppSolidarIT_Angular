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
        public IEnumerable<Product> GetAllProducts([FromQuery] int? themeId)
        {
            IQueryable<Product> products = _context.Products;
            if (themeId.HasValue)
            {
                products = products.Where(p => p.ThemeId == themeId);
            }
            return products;
        }

        /// <summary>
        ///     Récupère une liste de product a partir de themeid
        /// </summary>
        /// <returns></returns>
        /// GET api/<ProductsController>/
        [HttpGet("{Id}")]
        public ActionResult<Product> GetDetails(int Id)
        {   
   
            var product = _context.Products?.Find(Id); 
            if (product == null )
            {
                return NotFound("Aie aie aie, non trouvé! Produit non existant");
            }
            return Ok(product);
        }

   
   

        /// <summary>
        ///     Création d'un nouveau produit
        /// </summary>
        /// POST api/<ProductsController>
        [HttpPost()]
        public ActionResult CreateProduct(Product product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Products.Add(product);
                    _context.SaveChanges();

                    Console.WriteLine(product.Id);

                    return Ok(product);

                } else{
                    // Le modèle n'est pas valide, renvoyer les erreurs de validation
                    return BadRequest(ModelState);

                }
            }
            catch (Exception ex)
            {
                // Une exception s'est produite lors de l'ajout du produit
                Console.WriteLine($"Une erreur s'est produite lors de la création du produit : {ex.Message}");
                // Ajoutez l'erreur à ModelState pour qu'elle soit renvoyée dans le corps de la réponse BadRequest
                ModelState.AddModelError("", $"Une erreur s'est produite lors de la création du produit : {ex.Message}");
                return BadRequest(ModelState);
            }
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
        /// DELETE api/<ProductsController>/5
        [HttpDelete("{id}")]
        public ActionResult DeleteProduct(int Id)
        {
            try
            {
                var product = _context.Products.Find(Id);
                if (product == null)
                {
                   return NotFound("Produit non trouvé");
                }
                _context.Products.Remove(product);
                _context.SaveChanges();

                return Ok("Produit supprimé avec succès");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur s'est produite: {ex.Message}");
            }
        }
    }
}
