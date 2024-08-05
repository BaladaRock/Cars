using Cars.Server.Dto;
using Cars.Server.Models;

namespace Cars.Server.Repositories.Contracts
{
    public interface IBrandRepository
    {
        public Task<IEnumerable<Brand?>> GetAllBrands();

        public Task<Brand?> CreateBrand(BrandForCreateDto newBrand);

        public Task<Brand?> UpdateBrand(string? newName, BrandForUpdateDto brand);

        public Task DeleteBrand(string? name);
    }
}
