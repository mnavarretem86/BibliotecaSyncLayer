using Microsoft.AspNetCore.Mvc;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SyncLayer.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly CategoriaService _services;

        public CategoriaController(CategoriaService services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriaDTOs>>> GetCategorias()
        {
            var categorias = await _services.GetCategoriasAsync();
            return Ok(categorias);
        }

        [HttpPost]
        public async Task<IActionResult> CrearCategoria([FromBody] CategoriaDTOs dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _services.CrearCategoriaAsync(dto);

            return Ok(new { mensaje = "Categoria creada correctamente" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarCategoria(int id, [FromBody] CategoriaDTOs dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            dto.CategoriaID = id;

            await _services.ActualizarCategoriaAsync(dto);

            return Ok(new { mensaje = "Categoria actualizada correctamente" });
        }
    }
}