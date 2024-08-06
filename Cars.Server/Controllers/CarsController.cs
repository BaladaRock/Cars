using Cars.Server.Repositories.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Cars.Server.Controllers
{

    [Route("/cars")]
    [ApiController]
    public class CarsController(ICarRepository carRepository) : ControllerBase
    {
        private readonly ICarRepository _carRepository = carRepository;

        [HttpGet]
        public async Task<IActionResult> GetAllCars()
        {
            try
            {
                return Ok(await _carRepository.GetAllCars());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
