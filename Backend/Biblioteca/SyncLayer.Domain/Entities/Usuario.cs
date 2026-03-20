using System;

namespace SyncLayer.Domain.Entities
{
    public class Usuario
    {
        public int UsuarioID { get; set; }
        public int PersonaID { get;  set; }
        public string Contrasena { get;  set; }
        public int EstadoID { get;  set; }
        public DateTime FechaRegistro { get;  set; }

        public int RolID { get; set; }


    }
}