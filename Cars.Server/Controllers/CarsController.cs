using Microsoft.AspNetCore.Mvc;

namespace Cars.Server.Controllers
{
    public class CarsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
