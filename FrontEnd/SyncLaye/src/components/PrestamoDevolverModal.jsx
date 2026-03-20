import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function PrestamoDevolverModal({
  isOpen,
  prestamoId,
  onClose,
  onConfirm,
  loading
}) {
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setObservaciones("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prestamoId) return;
    onConfirm(prestamoId, observaciones);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-slate-200 rounded-[2rem] w-full max-w-md p-8
        shadow-[8px_8px_16px_#c8d0e7,-8px_-8px_16px_#ffffff]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Confirmar devolución
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/40 transition"
            disabled={loading}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Observaciones (opcional)"
            rows="4"
            disabled={loading}
            className="w-full p-4 rounded-2xl bg-slate-200 text-sm
            shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff]
            focus:outline-none resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-slate-200 font-medium
            shadow-[6px_6px_12px_#c8d0e7,-6px_-6px_12px_#ffffff]
            hover:shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff]
            transition-all active:scale-95 text-green-600 disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Devolver"}
          </button>
        </form>
      </div>
    </div>
  );
}