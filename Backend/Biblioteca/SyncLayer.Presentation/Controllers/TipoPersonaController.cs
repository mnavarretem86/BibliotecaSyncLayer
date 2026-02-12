using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SyncLayer.Application.Services;
using SyncLayer.Application.DTOs;

namespace SyncLayer.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoPersonaController : ControllerBase
    {
        private readonly TipoPersonaService _service;

        public TipoPersonaController(TipoPersonaService tipoPersonaService)
        {
            _service = tipoPersonaService;
        }

        [HttpGet]
        public async Task<IActionResult> ListarTipoPersona()
        {
            try
            {
                var lista = await _service.GetTipoPersonaListAsync();

                if (lista == null || !lista.Any())
                {
                    return NotFound("No se encontraron tipos de persona.");
                }

                return Ok(lista);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}