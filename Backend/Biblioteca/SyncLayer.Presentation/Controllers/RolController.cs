using Microsoft.AspNetCore.Mvc;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SyncLayer.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolController : ControllerBase
    {
        private readonly RolService _services;

        public RolController(RolService services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolDTO>>> GetRoles()
        {
            var roles = await _services.GetRolesAsync();
            return Ok(roles);
        }

        [HttpPost]
        public async Task<IActionResult> CrearRol([FromBody] RolDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _services.CrearRolAsync(dto);

            return Ok(new { mensaje = "Rol creado correctamente" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarRol(int id, [FromBody] RolDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            dto.RolID = id;

            await _services.ActualizarRolAsync(dto);

            return Ok(new { mensaje = "Rol actualizado correctamente" });
        }
    }
}