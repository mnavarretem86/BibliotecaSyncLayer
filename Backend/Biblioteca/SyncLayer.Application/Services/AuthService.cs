using SyncLayer.Application.DTOs;
using SyncLayer.Application.Interface;
using SyncLayer.Application.Models;

namespace SyncLayer.Application.Services
{
    public class AuthService
    {
        private readonly IAuthRepository _repository;

        public AuthService(IAuthRepository repository)
        {
            _repository = repository;
        }

        public async Task<LoginResponseDTO?> LoginAsync(LoginRequestDTO dto)
        {
            var usuario = await _repository.ObtenerUsuarioPorEmailAsync(dto.Email);

            if (usuario == null)
                return null;

            bool passwordValido = BCrypt.Net.BCrypt.Verify(
                dto.Password,
                usuario.PasswordHash
            );

            if (!passwordValido)
                return null;

            return new LoginResponseDTO
            {
                UsuarioID = usuario.UsuarioID,
                PersonaID = usuario.PersonaID,
                RolID = usuario.RolID,
                PrimerNombre = usuario.PrimerNombre,
                PrimerApellido = usuario.PrimerApellido,
                Email = usuario.Email,
                NombreRol = usuario.NombreRol
            };
        }
    }
}
