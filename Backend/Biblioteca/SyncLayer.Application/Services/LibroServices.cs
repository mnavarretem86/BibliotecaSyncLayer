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

            return libros.Select(MapToDTO).ToList();
        }


        public async Task<LibroDTOs?> ObtenerLibroPorIdAsync(int libroId)
        {
            var libro = await _repository.ObtenerLibroPorIdAsync(libroId);

            if (libro == null)
                return null;

            return MapToDTO(libro);
        }

        public async Task CrearLibroAsync(LibroDTOs dto)
        {
            var libro = MapToEntity(dto);

            await _repository.CrearLibroAsync(libro);
        }


        public async Task ActualizarLibroAsync(LibroDTOs dto)
        {
            var libro = MapToEntity(dto);

            await _repository.ActualizarLibroAsync(libro);
        }

        private LibroDTOs MapToDTO(Libro libro)
        {
            return new LibroDTOs
            {
                LibroID = libro.LibroID,
                Titulo = libro.Titulo,
                ISBN = libro.ISBN,
                AnioPublicacion = libro.AnioPublicacion,
                NombreCategoria = libro.NombreCategoria,
                NombreEstado = libro.NombreEstado,
                EstadoID = libro.EstadoID,
                CategoriaID = libro.CategoriaID,
                StockTotal = libro.StockTotal,
                StockDisponible = libro.StockDisponible
            };
        }

        private Libro MapToEntity(LibroDTOs dto)
        {
            return new Libro
            {
                LibroID = dto.LibroID,
                Titulo = dto.Titulo,
                ISBN = dto.ISBN,
                AnioPublicacion = dto.AnioPublicacion,
                CategoriaID = dto.CategoriaID,
                EstadoID = dto.EstadoID,
                StockTotal = dto.StockTotal
            };
        }
    }
}