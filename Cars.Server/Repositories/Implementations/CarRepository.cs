using Cars.Server.Context;
using Cars.Server.Dto;
using Cars.Server.Helpers;
using Cars.Server.Helpers.Exceptions;
using Cars.Server.Models;
using Cars.Server.Repositories.Contracts;
using Dapper;
using System.Data;

namespace Cars.Server.Repositories
{
    public class CarRepository(CarContext context) : ICarRepository
    {
        private readonly CarContext _context = context;

        public async Task<Car?> CreateCar(CarForCreateDto newCar)
        {
            using var connection = _context.CreateConnection();
            var existingCar = await connection.QueryFirstOrDefaultAsync<Car>(
                    "SELECT * FROM [dbo].[Models] WHERE SerialNumber = @NewSerialNumber",
                    new { NewSerialNumber = newCar.SerialNumber });

            if (existingCar != null)
            {
                throw new DuplicateSerialNumberException(newCar.SerialNumber!);
            }

            // Check the validity of the fuel type, sent via the request
            if (!IsValidFuelType(newCar.Fuel))
            {
                throw new ArgumentException("Invalid fuel type");
            }

            var queryInset = "INSERT INTO [dbo].[Models] (Brand, ModelYear, Model, Fuel, Color, SerialNumber)" +
                " VALUES (@Brand, @ModelYear, @Model, @Fuel, @Color, @SerialNumber)" +
                " SELECT CAST(SCOPE_IDENTITY() as NVARCHAR)";

            var parameters = new DynamicParameters();
            parameters.Add("Brand", newCar.Brand, DbType.String);
            parameters.Add("ModelYear", newCar.ModelYear, DbType.Int32);
            parameters.Add("Model", newCar.Model, DbType.String);
            parameters.Add("Fuel", newCar.Fuel.ToString(), DbType.String);
            parameters.Add("Color", newCar.Color, DbType.String);
            parameters.Add("SerialNumber", newCar.SerialNumber, DbType.String);
            parameters.Add("NewSerialNumber", newCar.SerialNumber, DbType.String);

            var insertedId = await connection.QuerySingleAsync<Car>(queryInset, parameters);

            return new Car
            {
                Brand = newCar.Brand,
                ModelYear = newCar.ModelYear,
                Model = newCar.Model,
                Fuel = newCar.Fuel,
                Color = newCar.Color,
                SerialNumber = newCar.SerialNumber
            };
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
            // Check the validity of the fuel type, sent via the request
            if (!IsValidFuelType(car.Fuel))
            {
                throw new ArgumentException("Invalid fuel type");
            }

            using var connection = _context.CreateConnection();

            // If SerialNumber has been changed, validate its uniqueness
            if (car.SerialNumber != serialNumber)
            {
                var existingCar = await connection.QueryFirstOrDefaultAsync<Car>(
                    "SELECT * FROM [dbo].[Models] WHERE SerialNumber = @NewSerialNumber",
                    new { NewSerialNumber = car.SerialNumber });

                if (existingCar != null)
                {
                    throw new DuplicateSerialNumberException(car.SerialNumber!);
                }
            }

            var queryUpdate = "UPDATE [dbo].[Models] SET Brand = @Brand, ModelYear = @ModelYear, Model = @Model," +
                " Fuel = @Fuel, Color = @Color, SerialNumber = @NewSerialNumber" +
                " WHERE SerialNumber = @OriginalSerialNumber";

            var parameters = new DynamicParameters();
            parameters.Add("Brand", car.Brand, DbType.String);
            parameters.Add("ModelYear", car.ModelYear, DbType.Int32);
            parameters.Add("Model", car.Model, DbType.String);
            parameters.Add("Fuel", car.Fuel.ToString(), DbType.String);
            parameters.Add("Color", car.Color, DbType.String);
            parameters.Add("NewSerialNumber", car.SerialNumber, DbType.String);
            parameters.Add("OriginalSerialNumber", serialNumber, DbType.String);

            await connection.ExecuteAsync(queryUpdate, parameters);
            return await GetCarBySerialNumber(car.SerialNumber);
        }

        private static bool IsValidFuelType(FuelType fuel) => Enum.IsDefined(typeof(FuelType), fuel);
    }
}
