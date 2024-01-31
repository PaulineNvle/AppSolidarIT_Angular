using AppSolidarIT_Angular.Server.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        public void CreateTheme(Theme theme)
        {

            _context.Themes.Add(theme);
            _context.SaveChanges();
        }

        [HttpPut]
        public void UpdateProduct(Theme theme)
        {

            _context.Themes.Remove(theme);
            _context.SaveChanges();
        }


        [HttpDelete]

        public void DeleteProduct(Theme theme)
        {

           _context.Themes.Remove(theme);
            _context.SaveChanges();
        }
    }

  


        
        
}
