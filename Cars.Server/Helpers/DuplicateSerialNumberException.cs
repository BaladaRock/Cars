namespace Cars.Server.Helpers
{
    public class DuplicateSerialNumberException(string serialNumber)
        : Exception($"SerialNumber '{serialNumber}' already exists.")
    {
    }
}
