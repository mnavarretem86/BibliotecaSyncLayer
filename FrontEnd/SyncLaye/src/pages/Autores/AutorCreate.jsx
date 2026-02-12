import { X, User, Globe, Save, CheckCircle, Plus } from "lucide-react";
import { useCreateAutor } from "../../hooks/Autores/useCreateAutor";

const NeumorphicField = ({ icon: Icon, name, placeholder, value, onChange, required = true }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
    <input
      required={required}
      name={name}
      type="text"
      placeholder={placeholder}
      value={value} 
      onChange={onChange}
      className="w-full pl-12 pr-4 py-3 bg-slate-200 rounded-xl shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] border-none outline-none text-slate-700 transition-all focus:ring-1 focus:ring-blue-400/30"
    />
  </div>
);
export default function AutorCreate({ isOpen, onClose, onRefresh }) {
  const { formData, loading, estados, handleChange, saveAutor } = useCreateAutor(onRefresh, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300 p-4">
      <div className="bg-slate-200 w-full max-w-md p-8 rounded-[2.5rem] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 transition-colors">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-light text-slate-800 mb-8">
          Nuevo <span className="font-semibold text-blue-600">Autor</span>
        </h2>

        <form onSubmit={saveAutor} className="space-y-5">
          <NeumorphicField 
            icon={User} name="primerNombre" placeholder="Primer Nombre" 
            value={formData.primerNombre} onChange={handleChange} 
          />
          <NeumorphicField 
            icon={User} name="primerApellido" placeholder="Primer Apellido" 
            value={formData.primerApellido} onChange={handleChange} 
          />
          <NeumorphicField 
            icon={User} name="segundoApellido" placeholder="Segundo Apellido" required={false} 
            value={formData.segundoApellido} onChange={handleChange} 
          />
          <NeumorphicField 
            icon={Globe} name="nacionalidad" placeholder="Nacionalidad" 
            value={formData.nacionalidad} onChange={handleChange} 
          />

          <div className="relative">
            <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              required
              name="estadoID"
              value={formData.estadoID}
              onChange={handleChange}
              className="w-full pl-12 pr-10 py-3 bg-slate-200 rounded-xl shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] border-none outline-none text-slate-700 appearance-none cursor-pointer focus:ring-1 focus:ring-blue-400/30"
            >
              <option value="">Seleccionar Estado</option>
              {estados.map(est => (
                <option key={est.estadoID} value={est.estadoID}>
                  {est.nombreEstado}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Plus size={14} className="rotate-45" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 mt-4 bg-slate-200 rounded-2xl shadow-[6px_6px_12px_#c8d0e7,-6px_-6px_12px_#ffffff] hover:shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] text-blue-600 font-bold transition-all disabled:opacity-50 active:scale-95 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <><Save size={18} /> Registrar Autor</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}