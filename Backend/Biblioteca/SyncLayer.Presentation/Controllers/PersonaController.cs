using Microsoft.AspNetCore.Mvc;
using SyncLayer.Application.Services;
using SyncLayer.Application.DTOs;

namespace SyncLayer.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        private readonly PersonaServices _services;

        public PersonasController(PersonaServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ListarPersonas()
        {
            try
            {
                var lista = await _services.ListarPersonasAsync();
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
                var persona = await _services.ObtenerPersonaPorIdAsync(id);

                if (persona == null)
                    return NotFound("Persona no encontrada");

                return Ok(persona);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Crear(PersonaDTOs dto)
        {
            try
            {
                await _services.CrearPersonaAsync(dto);
                return Ok("Persona creada correctamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Actualizar(int id, PersonaDTOs dto)
        {
            try
            {
                await _services.ActualizarPersonaAsync(id, dto);
                return Ok("Persona actualizada correctamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
