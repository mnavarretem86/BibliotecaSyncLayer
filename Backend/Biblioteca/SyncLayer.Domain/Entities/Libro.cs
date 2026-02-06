using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyncLayer.Domain.Entities
{
    public class Libro
    {
      public int LibroID { get; set; }
      public string? Titulo { get; set; }
      public string? ISBN { get; set; }
      public int   AnioPublicacion { get; set; }
      public string? NombreCategoria { get; set; }
      public string? NombreEstado { get; set; }
      public int CategoriaID { get; set; }
      public int EstadoID { get; set; }
      public int StockTotal { get; set; }
      public int StockDisponible { get; set; }
    }
}
