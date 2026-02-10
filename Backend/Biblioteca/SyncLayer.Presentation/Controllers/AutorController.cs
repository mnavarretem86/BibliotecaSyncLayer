using Microsoft.AspNetCore.Mvc;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SyncLayer.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutorController : ControllerBase
    {
        private readonly AutorServices _autorServices;

        public AutorController(AutorServices autorServices)
        {
            _autorServices = autorServices;
        }

        // GET: api/Autor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AutorDTOs>>> GetAutores()
        {
            var autores = await _autorServices.ListarAutoresAsync();
            return Ok(autores);
        }

        // GET: api/Autor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AutorDTOs>> GetAutor(int id)
        {
            var autor = await _autorServices.ObtenerAutorPorIdAsync(id);

            if (autor == null)
                return NotFound();

            return Ok(autor);
        }

        // POST: api/Autor
        [HttpPost]
        public async Task<IActionResult> CrearAutor([FromBody] AutorDTOs dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _autorServices.CrearAutorAsync(dto);
            return Ok(new { mensaje = "Autor creado correctamente" });
        }

        // PUT: api/Autor/5
        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarAutor(int id, [FromBody] AutorDTOs dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _autorServices.ActualizarAutorAsync(id, dto);
            return Ok(new { mensaje = "Autor actualizado correctamente" });
        }
    }
}
