import { useState } from "react";
import { useCategorias } from "../../hooks/Categoria/useCategorias";
import { Plus, Edit2, Layers, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CategoriaCreate from "./CategoriaCreate";
import CategoriaEdit from "./CategoriaEdit";

export default function Categorias() {

  const { categorias, loading, refetch } = useCategorias();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  const handleEdit = (categoria) => {
    setSelectedCategoria(categoria);
    setIsEditOpen(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-500">

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 mt-4">
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-2 transition-colors group"
          >
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-medium uppercase tracking-widest text-[10px]">
              Gestión Central
            </span>
          </Link>

          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Catálogo de <span className="font-semibold text-blue-600">Categorías</span>
          </h1>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-200 rounded-2xl 
          shadow-[6px_6px_12px_#c8d0e7,-6px_-6px_12px_#ffffff] 
          hover:shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] 
          transition-all font-medium text-sm active:scale-95"
        >
          <Plus size={18} /> Nueva Categoría
        </button>
      </header>

      <div className="bg-slate-200 rounded-[2rem] 
      shadow-[8px_8px_16px_#c8d0e7,-8px_-8px_16px_#ffffff] 
      overflow-hidden border border-white/20">

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
              <th className="px-8 py-5">Categoría</th>
              <th className="px-8 py-5 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2" className="py-20 text-center text-[10px] uppercase tracking-widest text-slate-400">
                  Consultando API...
                </td>
              </tr>
            ) : (
              categorias.map((c) => (
                <tr key={c.categoriaID} className="group hover:bg-white/30 transition-colors">

                  <td className="px-8 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center 
                    shadow-[4px_4px_8px_#c8d0e7,-4px_-4px_8px_#ffffff] text-slate-500">
                      <Layers size={18} />
                    </div>
                    <span className="font-medium text-slate-700">
                      {c.nombreCategoria}
                    </span>
                  </td>

                  <td className="px-8 py-4 text-right">
                    <button
                      onClick={() => handleEdit(c)}
                      className="p-2 rounded-xl 
                      shadow-[4px_4px_8px_#c8d0e7,-4px_-4px_8px_#ffffff] 
                      hover:shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] 
                      transition-all hover:text-blue-600"
                    >
                      <Edit2 size={16} />
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CategoriaCreate
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onRefresh={refetch}
      />

      <CategoriaEdit
        isOpen={isEditOpen}
        categoria={selectedCategoria}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedCategoria(null);
        }}
        onRefresh={refetch}
      />

    </div>
  );
}