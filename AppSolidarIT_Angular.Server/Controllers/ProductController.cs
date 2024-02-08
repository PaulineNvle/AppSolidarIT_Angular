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
        // GET: api/<ProductsController>
        [HttpGet]
        public IEnumerable<Product> GetAllProducts()
        {
            return _context.Products;
        }

        /// <summary>
        ///     Récupère un product à partir de son identifiant
        /// </summary>
        /// <returns></returns>
        // GET api/<ProductsController>/5
        [HttpGet("{Id}")]
        public ActionResult<Product> GetDetails(int Id)
        {
            var product = _context.Products?.Find(Id);
            if (product == null)
            {
                return NotFound("Aie aie aie, non trouvé!");
            }
            return Ok(product);
        }

        // un try catch aurait ausis fonctionné

        //[HttpGet("{id}")]
        //public ActionResult<Product> Get(int id)
        //{
        //    try
        //    {
        //        var product = _context.GetById(id);
        //        return Ok(product);
        //    }
        //    catch (NotFoundException e)
        //    {
        //        return NotFound(e.Message);
        //    }
        //}




        /// <summary>
        ///     Création d'un nouveau produit
        /// </summary>
 
        // POST api/<ProductsController>
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
                // autre option: 

                /// <param name="product"></param>
                /// <returns>Le product avec sont id (dans le Header trouveré son url d'accès)</returns>


                //try
                //{
                //    var result = _context.Create(product);
                //    return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
                //}

            }
            catch (DataException e)
            {
                return BadRequest(e.Message);
            }
            return Ok(product);
        }

        /// <summary>
        ///     Mise à jour d'un product
        /// </summary>
      
        /// <returns>Rien</returns>
        // PUT api/<ProductsController>/5
        [HttpPut]
        public ActionResult PutProduct([Bind(include: "Label, Theme, DescriptionShort, DescriptionLong")] Product product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Products.Update(product);
                    _context.SaveChanges();                                  }
            }
            catch (DataException)
            {
                ModelState.AddModelError("", "Impossible de mettre à jour le produit, verifier les conditions et essayez encore");
            }
            return Ok(product);



            // ou bien


            //if (id != product.id)
            //    return badrequest();

            //try
            //{
            //    _context.update(bird);
            //}
            //catch (duplicateexception e)
            //{
            //    return badrequest(e.message);
            //}
            //catch (notfoundexception e)
            //{
            //    return notfound(e.message);
            //}

            //return nocontent();

        }




        /// <summary>
        ///     On supprime un product
        /// </summary>
    
        /// <returns>Rien</returns>
        // DELETE api/<BirdsController>/5
        [HttpDelete]
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
