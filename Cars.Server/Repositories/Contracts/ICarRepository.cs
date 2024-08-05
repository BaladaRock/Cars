using Cars.Server.Dto;
using Cars.Server.Models;

namespace Cars.Server.Repositories.Contracts
{
    public interface ICarRepository
    {
        public Task<IEnumerable<Car?>> GetAllCars();

        public Task<IEnumerable<Car?>> GetCarsByBrand(Brand brandName);

        public Task<Car?> GetCarBySerialNumber(string? serialNumber);

        public Task<Car?> CreateCar(CarForCreateDto newCar);

        public Task<Car?> UpdateCar(string? serialNumber, CarForUpdateDto car);

        public Task DeleteCar(string? serialNumber);

    }
}
