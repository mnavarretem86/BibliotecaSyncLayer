using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Interface
{
    public interface ICategoriaRepository
    {
        Task CrearCategoriaAsync(Categoria categoria );
        Task ActualizarCategoriaAsync(Categoria categoria);
        Task<IEnumerable<Categoria>> ListarCategoriasAsync();

    }
}
