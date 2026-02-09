using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Interface
{
    public interface ILibroRepository
    {
        Task CrearLibroAsync(Libro libro);

        Task ActualizarLibroAsync(Libro libro);

        Task<Libro?> ObtenerLibroPorIdAsync(int libroId);


        Task<IEnumerable<Libro>> ListarLibrosAsync();
    }
}
