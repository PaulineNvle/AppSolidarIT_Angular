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




        [HttpGet()]
        public IEnumerable<Theme> GetAllThemes()
        {
            return _context.Themes;

        }

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

        [HttpPost()]
        public ActionResult CreateTheme( Theme theme)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Themes.Add(theme);
                    _context.SaveChanges();
                }


            }
            catch (DataException)
            {
                ModelState.AddModelError("", "Impossible de créer le theme , verifier les conditions et essayez encore");
            }
            return Ok(theme);
        }

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
