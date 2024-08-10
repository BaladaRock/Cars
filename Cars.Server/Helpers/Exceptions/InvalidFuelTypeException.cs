namespace Cars.Server.Helpers.Exceptions
{
    public class InvalidFuelTypeException() :
        Exception($"The given fuel type does not exist!")
    {
    }
}
