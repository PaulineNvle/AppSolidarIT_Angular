using AppSolidarIT_Angular.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace AppSolidarIT_Angular.Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ThemeController : ControllerBase
    {
        private readonly PortfolioDbfirstContext _context;

        public ThemeController(PortfolioDbfirstContext context)
        {
            _context = context;
        }



        /// <summary>
        ///     Récupère tout les theme
        /// </summary>
        /// <returns>Et bien des products, non ?</returns>
        /// GET: api/<ThemeController>
        [HttpGet()]
        public IEnumerable<Theme> GetAllThemes()
        {
            return _context.Themes;

        }
        /// <summary>
        ///     Récupère un theme à partir de son identifiant
        /// </summary>
        /// <returns></returns>
        /// GET api/<ThemeController>/5
        [HttpGet("{Id}")]

        public ActionResult<Theme> GetTheme(int Id)
        {
            var theme = _context.Themes?.Find(Id);
            if (theme == null)
            {
                return NotFound("Aie aie aie, non trouvé!");
            }
            return Ok(theme);

        }
        /// <summary>
        ///     Création d'un nouveau theme
        /// </summary>
        /// POST api/<ThemeController>
        [HttpPost()]
        public ActionResult CreateTheme(Theme theme)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Themes.Add(theme);
                    _context.SaveChanges();

                    Console.WriteLine(theme.Id);

                    return Ok(theme);
                }
                else
                {
                    // Le modèle n'est pas valide, renvoyer les erreurs de validation
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                // Une exception s'est produite lors de l'ajout du thème
                Console.WriteLine($"Une erreur s'est produite lors de la création du thème : {ex.Message}");
                return BadRequest(ModelState);
            }
        }


        /// <summary>
        ///     Mise à jour d'un theme
        /// </summary>
        /// <returns>Rien</returns>
        /// PUT api/<ThemeController>/5
        [HttpPut("{id}")]
        public ActionResult UpdateProduct( Theme theme)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Themes.Update(theme);
                    _context.SaveChanges();
                }
            }
            catch (DataException)
            {
                ModelState.AddModelError("", "Impossible de mettre à jour le theme, verifier les conditions et essayez encore");
            }
            return Ok(theme);


        }

        /// <summary>
        ///     On supprime un theme
        /// </summary>
        /// <returns>Rien</returns>
        /// DELETE api/<ThemeController>/5
        [HttpDelete("{id}")]

        public ActionResult DeleteProduct(Theme theme)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Themes.Remove(theme);
                    _context.SaveChanges();
                }
            }
            catch (DataException)
            {

                ModelState.AddModelError("", "Impossible de supprimer le theme");
            }
            return Ok(theme);


        }
    }
}
