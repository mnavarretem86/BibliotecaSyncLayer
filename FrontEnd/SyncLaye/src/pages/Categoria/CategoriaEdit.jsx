import { X, Layers, Save } from "lucide-react";
import { useEditCategoria } from "../../hooks/Categoria/useEditCategoria";

const NeumorphicField = ({ icon: Icon, value, onChange, placeholder }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
    <input
      required
      type="text"
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-3 bg-slate-200 rounded-xl
      shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff]
      border-none outline-none text-slate-700
      transition-all focus:ring-1 focus:ring-blue-400/30"
    />
  </div>
);

export default function CategoriaEdit({ isOpen, categoria, onClose, onRefresh }) {

  const { formData, loading, handleChange, updateCategoriaData } =
    useEditCategoria(categoria, isOpen, onRefresh, onClose);

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
    bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300 p-4">

      <div className="bg-slate-200 w-full max-w-md p-8 rounded-[2.5rem]
      shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]
      relative">

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-light text-slate-800 mb-8">
          Editar <span className="font-semibold text-blue-600">Categoría</span>
        </h2>

        <form onSubmit={updateCategoriaData} className="space-y-6">

          <NeumorphicField
            icon={Layers}
            value={formData.nombreCategoria}
            onChange={handleChange}
            placeholder="Nombre de la categoría"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4
            bg-slate-200 rounded-2xl
            shadow-[6px_6px_12px_#c8d0e7,-6px_-6px_12px_#ffffff]
            hover:shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff]
            text-blue-600 font-bold transition-all disabled:opacity-50 active:scale-95"
          >
            {loading ? "Actualizando..." : <><Save size={18} /> Guardar Cambios</>}
          </button>

        </form>
      </div>
    </div>
  );
}