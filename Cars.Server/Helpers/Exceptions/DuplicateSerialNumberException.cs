namespace Cars.Server.Helpers.Exceptions
{
    public class DuplicateSerialNumberException(string serialNumber) :
        Exception($"SerialNumber '{serialNumber}' already exists.")
    {
    }
}
