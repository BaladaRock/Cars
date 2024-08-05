using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Cars.Server.Context
{
    public class CarContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public CarContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("SqlConnection")!;
        }

        public IDbConnection CreateConnection() => new SqlConnection(_connectionString);
    }
}
