using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Interface
{
    public interface IPersonaRepository
    {

        Task CrearPersonaAsync(Persona persona );

        Task ActualizarPersonaAsync(Persona persona);
        
        Task <Persona?> ObtenerPersonaPorIdAsync(int personaId);       


        Task<IEnumerable<Persona>> ListarPersonasAsync();

    }
}
