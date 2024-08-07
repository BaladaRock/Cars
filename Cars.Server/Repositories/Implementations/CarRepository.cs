using Cars.Server.Context;
using Cars.Server.Dto;
using Cars.Server.Models;
using Cars.Server.Repositories.Contracts;
using Dapper;

namespace Cars.Server.Repositories
{
    public class CarRepository(CarContext context) : ICarRepository
    {
        private readonly CarContext _context = context;

        public Task<Car?> CreateCar(CarForCreateDto car)
        {
            throw new NotImplementedException();
        }

        public Task DeleteCar(string? serialNumber)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Car?>> GetAllCars()
        {
            var queryCars = "SELECT Brand, ModelYear, Model, Fuel, Color, SerialNumber FROM [dbo].[Models]";

            using var connection = _context.CreateConnection();
            return await connection.QueryAsync<Car>(queryCars);
        }

        public async Task<Car?> GetCarBySerialNumber(string? serialNumber)
        {
            var queryCar = "SELECT Brand, ModelYear, Model, Fuel, Color, SerialNumber FROM [dbo].[Models]" +
                   "WHERE SerialNumber = @serialNumber";

            using var connection = _context.CreateConnection();
            return await connection.QuerySingleOrDefaultAsync<Car>(queryCar, new {serialNumber});
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
