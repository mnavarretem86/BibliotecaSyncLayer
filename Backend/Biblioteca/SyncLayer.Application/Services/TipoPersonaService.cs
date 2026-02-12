using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Interface;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Services
{
    public class TipoPersonaService
    {
        private readonly ITipoPersonaRepository _repository;

        public TipoPersonaService(ITipoPersonaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TipoPersonaDTOs>> GetTipoPersonaListAsync()
        {

            var tipos = await _repository.GetAllTipoPersonaAsync();

            return tipos.Select(MapToDTO).ToList();
        }

        private TipoPersonaDTOs MapToDTO(TipoPersona tipopersona)
        {
            return new TipoPersonaDTOs
            {
                TipoPersonaID = tipopersona.TipoPersonaID,
                NombreTipo = tipopersona.NombreTipo,
                Descripcion = tipopersona.Descripcion
            };
        }
    }
}