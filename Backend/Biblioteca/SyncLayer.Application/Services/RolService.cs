using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Interface;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Services
{
    public class RolService
    {
        private readonly IRolRepository _repository;

        public RolService(IRolRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<RolDTO>> GetRolesAsync()
        {
            var roles = await _repository.ListarRolesAsync();
            return roles.Select(MapToDTO).ToList();
        }

        public async Task CrearRolAsync(RolDTO dto)
        {
            var rol = MapToEntity(dto);
            await _repository.CrearRolAsync(rol);
        }

        public async Task ActualizarRolAsync(RolDTO dto)
        {
            var rol = MapToEntity(dto);
            await _repository.ActualizarRolAsync(rol);
        }

        private Rol MapToEntity(RolDTO dto)
        {
            return new Rol
            {
                RolID = dto.RolID,
                NombreRol = dto.NombreRol,
                Descripcion = dto.Descripcion
            };
        }

        private RolDTO MapToDTO(Rol rol)
        {
            return new RolDTO
            {
                RolID = rol.RolID,
                NombreRol = rol.NombreRol,
                Descripcion = rol.Descripcion
            };
        }
    }
}