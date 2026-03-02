using Microsoft.AspNetCore.Mvc;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Services;

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
        public async Task<IActionResult> ListarLibros()
        {
            try
            {
                var lista = await _services.ListarLibrosAsync();
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerPorId(int id)
        {
            try
            {
                var libro = await _services.ObtenerLibroPorIdAsync(id);

                if (libro == null)
                    return NotFound("Libro no encontrado");

                return Ok(libro);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] LibroDTOs dto)
        {
            try
            {
                await _services.CrearLibroAsync(dto);
                return Ok("Libro creado correctamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

 
        [HttpPut("{id}")]
        public async Task<IActionResult> Actualizar(int id, [FromBody] LibroDTOs dto)
        {
            try
            {
                dto.LibroID = id;

                await _services.ActualizarLibroAsync(dto);

                return Ok("Libro actualizado correctamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}