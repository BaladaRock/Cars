using Microsoft.AspNetCore.Mvc;

namespace Cars.Server.Controllers
{
    public class BrandsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
