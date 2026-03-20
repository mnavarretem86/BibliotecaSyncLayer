using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Interface;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Services
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _repository;

        public UsuarioService(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<UsuarioListadoDTO>> GetUsuariosAsync()
        {
            return await _repository.ListarUsuariosAsync();
        }

        public async Task<IEnumerable<UsuarioDTO>> GetUsuariosSinRolAsync()
        {
            var usuarios = await _repository.ListarUsuariosSinRolAsync();
            return usuarios.Select(MapToDTO).ToList();
        }

        public async Task CrearUsuarioAsync(UsuarioDTO dto)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Contrasena);

            var usuario = new Usuario
            {
                PersonaID = dto.PersonaID,
                Contrasena = passwordHash,
                EstadoID = dto.EstadoID,
                FechaRegistro = DateTime.UtcNow,
                RolID = dto.RolID
            };

            await _repository.CrearUsuarioAsync(usuario);
        }

        public async Task ActualizarUsuarioAsync(UsuarioDTO dto)
        {
            var usuario = new Usuario
            {
                UsuarioID = dto.UsuarioID,
                PersonaID = dto.PersonaID,
                EstadoID = dto.EstadoID,
                FechaRegistro = dto.FechaRegistro,
                RolID = dto.RolID
            };

            if (!string.IsNullOrWhiteSpace(dto.Contrasena))
            {
                usuario.Contrasena = BCrypt.Net.BCrypt.HashPassword(dto.Contrasena);
            }

            await _repository.ActualizarUsuarioAsync(usuario);
        }

        private UsuarioDTO MapToDTO(Usuario usuario)
        {
            return new UsuarioDTO
            {
                UsuarioID = usuario.UsuarioID,
                PersonaID = usuario.PersonaID,
                Contrasena = string.Empty,
                EstadoID = usuario.EstadoID,
                FechaRegistro = usuario.FechaRegistro,
                RolID = usuario.RolID
            };
        }
    }
}