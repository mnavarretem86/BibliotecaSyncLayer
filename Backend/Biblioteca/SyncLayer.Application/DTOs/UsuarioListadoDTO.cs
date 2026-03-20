namespace SyncLayer.Application.DTOs
{
    public class UsuarioListadoDTO
    {
        public int UsuarioID { get; set; }
        public int PersonaID { get; set; }
        public string NombrePersona { get; set; }
        public int EstadoID { get; set; }
        public string NombreEstado { get; set; }
        public int RolID { get; set; }
        public string NombreRol { get; set; }
        public DateTime FechaRegistro { get; set; }
    }
}