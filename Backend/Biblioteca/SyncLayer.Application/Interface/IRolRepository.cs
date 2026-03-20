using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Interface
{
    public interface IRolRepository
    {
        Task CrearRolAsync(Rol rol);
        Task ActualizarRolAsync(Rol rol);
        Task<IEnumerable<Rol>> ListarRolesAsync();
    }
}