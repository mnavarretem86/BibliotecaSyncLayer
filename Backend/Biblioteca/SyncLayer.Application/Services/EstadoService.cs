using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Interface;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Services
{
    public class EstadoService 
    {

        private readonly IEstadoRepository _estadoRepository;

        public EstadoService (IEstadoRepository estadoRepository)
        {

            _estadoRepository = estadoRepository;
        }




        public async Task<IEnumerable<EstadoDTOs>> GetEstadoListAsync()
        {

            var estados = await _estadoRepository.GetEstadoListAsync();

            return estados.Select(MapToDTO).ToList();
        }



        public async Task CrearEstadoAsync(EstadoDTOs dto)

        {
            var Estado = MapToEntity(dto);
            await _estadoRepository.CrearEstadoAsync (Estado);
        }

    

        public async Task UpdateEstadoAsync(EstadoDTOs dto)

        {
            var Estado = MapToEntity(dto);
            await _estadoRepository.UpdateEstadoAsync (Estado);

        }



        private EstadoDTOs MapToDTO(Estado estado)

        {
            return new EstadoDTOs

            {
                EstadoID = estado.EstadoID,
                NombreEstado = estado.NombreEstado,
                TipoEstado = estado.TipoEstado

            };
        }


        private Estado MapToEntity(EstadoDTOs dto)
        {
            return new Estado
            {
                EstadoID = dto.EstadoID,
                NombreEstado = dto.NombreEstado,
                TipoEstado = dto.TipoEstado
            };
        }


    }
}
