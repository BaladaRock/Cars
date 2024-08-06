using Cars.Server.Dto;
using Cars.Server.Models;
using Cars.Server.Repositories.Contracts;

namespace Cars.Server.Repositories
{
    public class BrandRepository : IBrandRepository
    {
        public Task<Brand?> CreateBrand(BrandForCreateDto newBrand)
        {
            throw new NotImplementedException();
        }

        public Task DeleteBrand(string? name)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Brand?>> GetAllBrands()
        {
            throw new NotImplementedException();
        }

        public Task<Brand?> UpdateBrand(string? newName, BrandForUpdateDto brand)
        {
            throw new NotImplementedException();
        }
    }
}
