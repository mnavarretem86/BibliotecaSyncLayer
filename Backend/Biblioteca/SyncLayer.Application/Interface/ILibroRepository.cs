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
        //Opcion 1 (Insertart)
        Task CrearLibroAsync(Libro libro);

        //Opcion 2 Actualizar Libro
        Task ActualizarLibroAsync(Libro libro);

        //Opcion 3 Obtener Libro por ID
        Task<Libro?> ObtenerLibroPorIdAsync(int libroId);

        //Opcion 4 obtener Lista de libro

        Task<IEnumerable<Libro>> ListarLibrosAsync();
    }
}
