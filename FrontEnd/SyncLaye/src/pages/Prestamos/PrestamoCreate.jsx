import { useEffect } from "react";
import { X, Search, User, BookOpen, Save, CheckCircle2 } from "lucide-react";
import { useCreatePrestamo } from "../../hooks/Prestamo/useCreatePrestamo";

const InputS = ({ label, icon: Icon, val, setVal, list, onSel, field }) => (
  <div className="space-y-2 relative">
    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">{label}</label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input type="text" value={val} onChange={e => setVal(e.target.value)} placeholder={`Buscar ${label}...`}
        className="w-full pl-12 pr-4 py-3 bg-slate-200 rounded-2xl shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] outline-none text-slate-700 focus:ring-1 focus:ring-blue-400" />
    </div>
    {list.length > 0 && (
      <div className="absolute z-20 w-full mt-1 p-2 bg-slate-200 rounded-xl shadow-[8px_8px_16px_#bebebe] border border-white/40">
        {list.map(i => (
          <button key={i.libroID || i.usuarioID} onClick={() => onSel(i)}
            className="w-full flex justify-between p-2 rounded-lg hover:bg-blue-600 hover:text-white text-sm transition-all">
            {i[field]} <CheckCircle2 size={14} className="opacity-50" />
          </button>
        ))}
      </div>
    )}
  </div>
);

export default function PrestamoCreate({ isOpen, onClose, onRefresh }) {
  const { form, setForm, loading, save, filtered, libroSel } = useCreatePrestamo(onRefresh, onClose);

  useEffect(() => { if (!isOpen) setForm({ libroID: "", usuarioID: "", qL: "", qU: "" }); }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-slate-200 w-full max-w-4xl p-8 rounded-[2.5rem] shadow-[20px_20px_60px_#bebebe] relative animate-in zoom-in-95">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-red-500"><X size={24} /></button>
        
        <h2 className="text-2xl font-light text-center mb-8 uppercase tracking-tighter">Nuevo <span className="font-bold text-blue-600">Préstamo</span></h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <InputS label="Libro" icon={Search} val={form.qL} setVal={v => setForm({...form, qL: v})} 
                    list={filtered.libros} field="titulo" onSel={l => setForm({...form, libroID: l.libroID, qL: l.titulo})} />
            
            <InputS label="Usuario" icon={User} val={form.qU} setVal={v => setForm({...form, qU: v})} 
                    list={filtered.usuarios} field="name" onSel={u => setForm({...form, usuarioID: u.usuarioID, qU: u.name})} />
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div className={`flex-1 p-6 rounded-3xl flex flex-col items-center justify-center text-center transition-all 
              ${libroSel ? 'bg-slate-200 shadow-[inset_6px_6px_12px_#c8d0e7,inset_-6px_-6px_12px_#ffffff]' : 'border-2 border-dashed border-slate-300 opacity-40'}`}>
              {libroSel ? (
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-blue-600 uppercase italic">{libroSel.nombreCategoria}</span>
                  <h3 className="text-xl font-bold text-slate-800 leading-tight">{libroSel.titulo}</h3>
                  <p className="text-sm font-black text-green-600">{libroSel.stockDisponible} Disponibles</p>
                </div>
              ) : <><BookOpen size={40} className="opacity-10 mb-2"/> <p className="text-xs italic">Pendiente de selección</p></>}
            </div>

            <button onClick={save} disabled={loading || !form.libroID || !form.usuarioID || libroSel?.stockDisponible <= 0}
              className="w-full py-4 bg-slate-200 rounded-2xl shadow-[6px_6px_12px_#c8d0e7,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#c8d0e7] text-blue-600 font-bold uppercase text-xs flex items-center justify-center gap-2 disabled:opacity-30 transition-all">
              <Save size={18} /> {loading ? "Procesando..." : "Confirmar Préstamo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}