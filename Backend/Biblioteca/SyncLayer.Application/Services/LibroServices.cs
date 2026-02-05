using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Interface;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Services
{
    public class LibroServices
    {
        private readonly ILibroRepository _repository;

        public LibroServices(ILibroRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<LibroDTOs>> ListarLibrosAsync()
        {
            var libros = await _repository.ListarLibrosAsync();

            return libros.Select(l => new LibroDTOs
            {
                LibroID = l.LibroID,
                Titulo = l.Titulo,
                ISBN = l.ISBN,
                AnioPublicacion = l.AnioPublicacion,
                NombreCategoria = l.NombreCategoria,
                NombreEstado = l.NombreEstado,
                EstadoID = l.EstadoID,
                StockTotal = l.StockTotal,
                StockDisponible = l.StockDisponible
            });
        }

        public async Task<LibroDTOs?> ObtenerLibroPorIdAsync(int libroId)
        {
            var libro = await _repository.ObtenerLibroPorIdAsync(libroId);

            if (libro == null)
                return null;

            return new LibroDTOs
            {
                LibroID = libro.LibroID,
                Titulo = libro.Titulo,
                ISBN = libro.ISBN,
                AnioPublicacion = libro.AnioPublicacion,
                CategoriaID = libro.CategoriaID,
                EstadoID = libro.EstadoID,
                StockTotal = libro.StockTotal,
                StockDisponible = libro.StockDisponible
            };
        }

        public async Task CrearLibroAsync(LibroDTOs dto)
        {
            var libro = new Libro
            {
                Titulo = dto.Titulo,
                ISBN = dto.ISBN,
                AnioPublicacion = dto.AnioPublicacion,
                CategoriaID = dto.CategoriaID,
                EstadoID = dto.EstadoID,
                StockTotal = dto.StockTotal
            };

            await _repository.CrearLibroAsync(libro);
        }

        public async Task ActualizarLibroAsync(int libroId, LibroDTOs dto)
        {
            var libro = new Libro
            {
                LibroID = libroId,
                Titulo = dto.Titulo,
                ISBN = dto.ISBN,
                AnioPublicacion = dto.AnioPublicacion,
                CategoriaID = dto.CategoriaID,
                EstadoID = dto.EstadoID,
                StockTotal = dto.StockTotal
            };

            await _repository.ActualizarLibroAsync(libro);
        }
    }
}
