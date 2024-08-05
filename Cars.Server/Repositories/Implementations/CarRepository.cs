using Cars.Server.Dto;
using Cars.Server.Models;
using Cars.Server.Repositories.Contracts;

namespace Cars.Server.Repositories.Implementations
{
    public class CarRepository : ICarRepository
    {
        public Task<Car?> CreateCar(CarForCreateDto car)
        {
            throw new NotImplementedException();
        }

        public Task DeleteCar(string? serialNumber)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Car?>> GetAllCars()
        {
            throw new NotImplementedException();
        }

        public Task<Car?> GetCarBySerialNumber(string? serialNumber)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Car?>> GetCarsByBrand(Brand brandName)
        {
            throw new NotImplementedException();
        }

        public Task<Car?> UpdateCar(string? serialNumber, CarForUpdateDto car)
        {
            throw new NotImplementedException();
        }
    }
}
