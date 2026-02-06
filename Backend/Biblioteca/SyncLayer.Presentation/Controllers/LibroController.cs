using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Services;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibroController : ControllerBase
    {
        private readonly LibroServices _services;

        public LibroController(LibroServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Libro>>> ListarLibros()
        {
            var lista = await _services.ListarLibrosAsync();

            if (lista == null || !lista.Any())
                return NoContent();

            return Ok(lista);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Libro>> ObtenerPorId(int id)
        {
            if (id <= 0)
                return BadRequest("El ID debe ser mayor que cero.");

            var libro = await _services.ObtenerLibroPorIdAsync(id);

            if (libro == null)
                return NotFound("Libro no encontrado.");

            return Ok(libro);
        }

        [HttpPost]
        public async Task<IActionResult> CrearLibro(LibroDTOs dto)
        {
            try
            {
                await _services.CrearLibroAsync(dto);
                return Ok("Libro creada correctamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> ActualizarLibro(int id, LibroDTOs dto)
        {
            try
            {
                await _services.ActualizarLibroAsync(id, dto);
                return Ok("Libro actualizado correctamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
