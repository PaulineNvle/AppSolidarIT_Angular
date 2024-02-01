using AppSolidarIT_Angular.Server.Entities;
using Microsoft.AspNetCore.Http;
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
                return NotFound();
            }
            return Ok(theme);

        }

        [HttpPost]
        public ActionResult CreateTheme([Bind(include: "Name, DesccriptionShort")] Theme theme)
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
                ModelState.AddModelError("", "Impossible de créer le produit, verifier les conditions et essayez encore");
            }
            return Ok(theme);
        }

        [HttpPut]
        public ActionResult UpdateProduct([Bind(include: "Name, DesccriptionShort")] Theme theme)
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
                ModelState.AddModelError("", "Impossible de mettre à jour le theme, verifier les conditions et essayez encore");
            }
            return Ok(theme);


        }


        [HttpDelete]

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
