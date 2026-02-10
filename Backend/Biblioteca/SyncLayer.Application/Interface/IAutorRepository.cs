using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Interface
{
    public interface IAutorRepository
    {
        Task CrearAutorAsync(Autor autor);

        Task ActualizarAutorAsync(Autor autor);

        Task<Autor?> ObtenerAutorPorIdAsync(int AutorId);

        Task<IEnumerable<Autor>> ListarAutorAsync();

    }
}
