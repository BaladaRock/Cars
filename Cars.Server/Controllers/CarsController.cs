using Cars.Server.Dto;
using Cars.Server.Helpers;
using Cars.Server.Helpers.Exceptions;
using Cars.Server.Repositories.Contracts;
using Microsoft.AspNetCore.Cors;
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

        [HttpPost()]
        public async Task<IActionResult> CreateCar([FromBody] CarForCreateDto car)
        {
            try
            {
                var createdCar = await _carRepository.CreateCar(car);
                return CreatedAtRoute("GetCarBySerialNumber",
                    new
                    {
                        createdCar?.SerialNumber
                    },
                    createdCar
                   );
            }
            catch (Exception ex) when (ex is DuplicateSerialNumberException)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (Exception ex) when (ex is InvalidFuelTypeException)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{serialNumber}", Name = "UpdateCar")]
        public async Task<IActionResult> UpdateCar(string? serialNumber, [FromBody] CarForUpdateDto car)
        {
            try
            {
                var carToUpdate = await _carRepository.GetCarBySerialNumber(serialNumber);
                if (carToUpdate == null)
                    return NotFound();

                var updatedCar = await _carRepository.UpdateCar(serialNumber, car);

                return Ok(updatedCar);
            }
            catch (Exception ex) when (ex is DuplicateSerialNumberException)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (Exception ex) when (ex is InvalidFuelTypeException)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
