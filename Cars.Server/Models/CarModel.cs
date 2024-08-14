using Cars.Server.Helpers;

namespace Cars.Server.Models
{
    public class CarModel
    {
        public string? Brand { get; set; }

        public int ModelYear { get; set; }

        public string? Model { get; set; }

        public FuelType Fuel { get; set; }

        public string? Color { get; set; }
    }
}
