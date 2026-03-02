import { 
  X, BookOpen, Hash, Calendar, Layers, CheckCircle, Boxes, Save, Plus 
} from "lucide-react";
import { useEditLibro } from "../../hooks/Libro/useEditLibro";

const NeumorphicField = ({ icon: Icon, name, type = "text", placeholder, value, onChange }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
    <input
      required
      name={name}
      type={type}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      className="w-full pl-12 pr-4 py-3 bg-slate-200 rounded-xl 
      shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] 
      border-none outline-none text-slate-700 
      transition-all focus:ring-1 focus:ring-blue-400/30"
    />
  </div>
);

export default function LibroEdit({ isOpen, onClose, onRefresh, libroId }) {

  const {
    formData,
    categorias,
    estados,
    loading,
    handleChange,
    updateLibroData
  } = useEditLibro(libroId, isOpen, onRefresh, onClose);

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center 
    bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300 p-4">

      <div className="bg-slate-200 w-full max-w-md p-8 rounded-[2.5rem] 
      shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] 
      relative max-h-[90vh] overflow-y-auto custom-scrollbar">

        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-light text-slate-800 mb-8">
          Editar <span className="font-semibold text-blue-600">Libro</span>
        </h2>

        <form onSubmit={updateLibroData} className="space-y-5">

          <NeumorphicField
            icon={BookOpen}
            name="titulo"
            placeholder="Título"
            value={formData.titulo}
            onChange={handleChange}
          />

          <NeumorphicField
            icon={Hash}
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
          />

          <NeumorphicField
            icon={Calendar}
            name="anioPublicacion"
            type="number"
            placeholder="Año de Publicación"
            value={formData.anioPublicacion}
            onChange={handleChange}
          />

          {/* Categoria */}
          <div className="relative">
            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              required
              name="categoriaID"
              value={formData.categoriaID || ""}
              onChange={handleChange}
              className="w-full pl-12 pr-10 py-3 bg-slate-200 rounded-xl 
              shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] 
              border-none outline-none text-slate-700 appearance-none cursor-pointer 
              focus:ring-1 focus:ring-blue-400/30"
            >
              <option value="">Seleccionar Categoría</option>
              {categorias.map(cat => (
                <option key={cat.categoriaID} value={cat.categoriaID}>
                  {cat.nombreCategoria}
                </option>
              ))}
            </select>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Plus size={14} className="rotate-45" />
            </div>
          </div>

          {/* Estado */}
          <div className="relative">
            <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              required
              name="estadoID"
              value={formData.estadoID || ""}
              onChange={handleChange}
              className="w-full pl-12 pr-10 py-3 bg-slate-200 rounded-xl 
              shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] 
              border-none outline-none text-slate-700 appearance-none cursor-pointer 
              focus:ring-1 focus:ring-blue-400/30"
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

          <NeumorphicField
            icon={Boxes}
            name="stockTotal"
            type="number"
            placeholder="Stock Total"
            value={formData.stockTotal}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 mt-4 
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