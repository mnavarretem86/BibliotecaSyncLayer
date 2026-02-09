using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyncLayer.Application.DTOs
{
    public class LoginResponseDTO
    {
        public int UsuarioID { get; set; }
        public int PersonaID { get; set; }
        public int RolID { get; set; }

        public string PrimerNombre { get; set; } = string.Empty;
        public string PrimerApellido { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string NombreRol { get; set; } = string.Empty;
    }


}
