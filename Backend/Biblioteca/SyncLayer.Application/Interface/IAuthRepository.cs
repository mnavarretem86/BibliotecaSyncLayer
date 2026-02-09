using SyncLayer.Application.Models;

namespace SyncLayer.Application.Interface
{
    public interface IAuthRepository
    {
        Task<LoginData?> ObtenerUsuarioPorEmailAsync(string email);
    }
}
