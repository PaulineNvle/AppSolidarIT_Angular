using Microsoft.AspNetCore.Mvc;

namespace AppSolidarIT_Angular.Server.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class HomeController : Controller
    {
        [Route("/")]
        [Route("/api")]
        // GET: /<controller>/
        public IActionResult Index() => new RedirectResult("~/swagger");
    }
}
