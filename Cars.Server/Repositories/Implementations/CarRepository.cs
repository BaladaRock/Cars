using Cars.Server.Context;
using Cars.Server.Dto;
using Cars.Server.Helpers;
using Cars.Server.Models;
using Cars.Server.Repositories.Contracts;
using Dapper;
using System.Data;

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

        public async Task<IEnumerable<Car?>> GetCarsByBrand(Brand brandName)
        {
            throw new NotImplementedException();
        }

        public async Task<Car?> UpdateCar(string? serialNumber, CarForUpdateDto car)
        {
            var queryUpdate = "UPDATE [dbo].[Models] SET Brand = @Brand, ModelYear = @ModelYear, Model = @Model," +
                " Fuel = @Fuel, Color = @Color, SerialNumber = @newSerialNumber" +
                " WHERE SerialNumber = @serialNumber";

            var parameters = new DynamicParameters();
            parameters.Add("Brand", car.Brand, DbType.String);
            parameters.Add("ModelYear", car.ModelYear, DbType.Int32);
            parameters.Add("Model", car.Model, DbType.String);
            parameters.Add("Fuel", car.Fuel, DbType.String);
            parameters.Add("Color", car.Color, DbType.String);
            parameters.Add("newSerialNumber", car.SerialNumber, DbType.String);
            parameters.Add("serialNumber", serialNumber, DbType.String);

            using var connection = _context.CreateConnection();

            // Check if the new serial number already exists in the db
            var existingCar = await connection.QueryFirstOrDefaultAsync<Car>(
                "SELECT * FROM [dbo].[Models] WHERE SerialNumber = @NewSerialNumber",
                new { newSerialNumber = car.SerialNumber });

            if (existingCar != null && existingCar.SerialNumber != serialNumber)
            {
                throw new DuplicateSerialNumberException(car.SerialNumber!);
            }

            await connection.ExecuteAsync(queryUpdate, parameters);

            return await GetCarBySerialNumber(car.SerialNumber);
        }
    }
}
