using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SyncLayer.Domain.Entities;
using SyncLayer.Application.DTOs;

namespace SyncLayer.Application.Interface
{
    public interface IUsuarioRepository
    {
        Task CrearUsuarioAsync(Usuario usuario);

        Task ActualizarUsuarioAsync(Usuario usuario);

        Task<IEnumerable<UsuarioListadoDTO>> ListarUsuariosAsync();

        Task<IEnumerable<Usuario>> ListarUsuariosSinRolAsync();
    }
}