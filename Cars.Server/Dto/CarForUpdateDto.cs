﻿using Cars.Server.Helpers;

namespace Cars.Server.Dto
{
    public class CarForUpdateDto
    {
        public int ModelYear { get; set; }

        public string? Model { get; set; }

        public FuelType Fuel { get; set; }

        public string? Color { get; set; }

        public string? SerialNumber { get; set; }
    }
}
