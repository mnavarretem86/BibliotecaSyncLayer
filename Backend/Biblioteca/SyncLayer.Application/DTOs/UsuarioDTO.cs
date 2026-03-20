using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyncLayer.Application.DTOs
{
    public class UsuarioDTO
    {
        public int UsuarioID { get; set; }
        public int PersonaID { get; set; }
        public string Contrasena { get; set; }
        public int EstadoID { get; set; }
        public DateTime FechaRegistro { get; set; }
        public int RolID { get; set; }
    }
}