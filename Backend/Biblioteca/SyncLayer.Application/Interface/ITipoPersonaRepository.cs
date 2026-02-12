using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Interface
{
    public interface ITipoPersonaRepository
    {

        Task CrearTipoPersonaAsync(TipoPersona tipoPersona);
        Task ActualizarTipoPersonaAsync(TipoPersona tipoPersona);
        Task<IEnumerable<TipoPersona>> GetAllTipoPersonaAsync();

    }
}
