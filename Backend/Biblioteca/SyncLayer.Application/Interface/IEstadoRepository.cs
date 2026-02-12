using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Interface
{
    public interface IEstadoRepository
    {

        Task CrearEstadoAsync(Estado estado);

        Task UpdateEstadoAsync(Estado estado);

        Task<IEnumerable<Estado>> GetEstadoListAsync();

    }
}
