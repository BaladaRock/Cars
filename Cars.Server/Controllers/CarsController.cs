using Cars.Server.Repositories.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Cars.Server.Controllers
{

    [Route("/api/cars")]
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

        [HttpGet("{serialNumber}", Name = "GetCarBySerialNumber")]
        public async Task<IActionResult> GetCarBySerialNumber(string? serialNumber)
        {
            try
            {
                // Encode serial number to protect from requests with special characters
                var encodedSerialNumber = Uri.EscapeDataString(serialNumber ?? "");

                var car = await _carRepository.GetCarBySerialNumber(serialNumber);
                if (car == null)
                    return NotFound();

                return Ok(car);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
    }
}
