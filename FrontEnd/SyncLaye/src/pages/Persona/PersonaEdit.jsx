import { X, User, Mail, Phone, MapPin, Calendar, Fingerprint, Save, Briefcase } from "lucide-react";
import { useEditPersona } from "../../hooks/Persona/useEditPersona";

const NeumorphicField = ({ icon: Icon, name, placeholder, value, onChange, type = "text", required = true }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
    <input
      required={required} name={name} type={type} placeholder={placeholder}
      value={value || ""} onChange={onChange}
      className="w-full pl-11 pr-4 py-2.5 bg-slate-200 rounded-xl shadow-[inset_2px_2px_5px_#c8d0e7,inset_-2px_-2px_5px_#ffffff] border-none outline-none text-sm text-slate-700"
    />
  </div>
);

export default function PersonaEdit({ isOpen, onClose, onRefresh, personaId }) {
  const { formData, tipos, loading, handleChange, handleUpdate } = useEditPersona(personaId, onRefresh, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in zoom-in duration-200">
      <div className="bg-slate-200 w-full max-w-3xl p-8 rounded-[2.5rem] shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 transition-colors">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-light text-slate-800 mb-8">
          Editar Registro: <span className="font-bold text-blue-600">{formData.primerNombre}</span>
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NeumorphicField icon={Fingerprint} name="dni" placeholder="DNI" value={formData.dni} onChange={handleChange} />
            
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select 
                name="tipoPersonaID" value={formData.tipoPersonaID || ""} onChange={handleChange} required 
                className="w-full pl-11 pr-4 py-2.5 bg-slate-200 rounded-xl shadow-[inset_2px_2px_5px_#c8d0e7] outline-none text-sm text-slate-700 appearance-none"
              >
                <option value="">Seleccione Tipo...</option>
                {tipos.map(t => <option key={t.tipoPersonaID} value={t.tipoPersonaID}>{t.nombreTipo}</option>)}
              </select>
            </div>

            <NeumorphicField icon={User} name="primerNombre" placeholder="Primer Nombre" value={formData.primerNombre} onChange={handleChange} />
            <NeumorphicField icon={User} name="segundoNombre" placeholder="Segundo Nombre" value={formData.segundoNombre} onChange={handleChange} required={false} />
            <NeumorphicField icon={User} name="primerApellido" placeholder="Primer Apellido" value={formData.primerApellido} onChange={handleChange} />
            <NeumorphicField icon={User} name="segundoApellido" placeholder="Segundo Apellido" value={formData.segundoApellido} onChange={handleChange} required={false} />
  
            <select 
              name="genero" value={formData.genero || ""} onChange={handleChange} required 
              className="w-full px-4 py-2.5 bg-slate-200 rounded-xl shadow-[inset_2px_2px_5px_#c8d0e7] outline-none text-sm text-slate-700"
            >
              <option value="">Género...</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>

            <NeumorphicField icon={Calendar} name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />
            <NeumorphicField icon={Mail} name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <NeumorphicField icon={Phone} name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
          </div>

          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-slate-400" size={16} />
            <textarea 
              name="direccion" placeholder="Dirección..." value={formData.direccion || ""} onChange={handleChange} required
              className="w-full pl-11 pr-4 py-3 bg-slate-200 rounded-xl shadow-[inset_2px_2px_5px_#c8d0e7] outline-none text-sm text-slate-700 h-24 resize-none" 
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-slate-200 rounded-2xl shadow-lg hover:shadow-inner text-blue-600 font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Sincronizando..." : <><Save size={18} /> Confirmar Cambios</>}
          </button>
        </form>
      </div>
    </div>
  );
}