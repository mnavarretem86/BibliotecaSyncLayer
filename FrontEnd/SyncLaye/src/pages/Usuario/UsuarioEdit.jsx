import { X, User, Lock, Shield, ToggleLeft, Save } from "lucide-react";
import { useEditUsuario } from "../../hooks/Usuario/useEditUsuario";

const NeumorphicField = ({ icon: Icon, name, placeholder, value, onChange, type = "text", required = true }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
    <input
      required={required}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      className="w-full pl-11 pr-4 py-2.5 bg-slate-200 rounded-xl shadow-[inset_2px_2px_5px_#c8d0e7,inset_-2px_-2px_5px_#ffffff] border-none outline-none text-sm text-slate-700"
    />
  </div>
);

export default function UsuarioEdit({ isOpen, onClose, onRefresh, usuarioId }) {

  const {
    formData,
    roles,
    estados,
    loading,
    handleChange,
    handleUpdate
  } = useEditUsuario(usuarioId, onRefresh, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in zoom-in duration-200">

      <div className="bg-slate-200 w-full max-w-2xl p-8 rounded-[2.5rem] shadow-2xl relative">

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-light text-slate-800 mb-8">
          Editar Usuario: <span className="font-bold text-blue-600">{formData.nombrePersona}</span>
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* PERSONA */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

              <input
                disabled
                value={formData.nombrePersona || ""}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-200 rounded-xl shadow-[inset_2px_2px_5px_#c8d0e7] outline-none text-sm text-slate-700"
              />
            </div>

            {/* ROL */}
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

              <select
                name="rolID"
                value={formData.rolID || ""}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-2.5 bg-slate-200 rounded-xl shadow-[inset_2px_2px_5px_#c8d0e7] outline-none text-sm text-slate-700 appearance-none"
              >
                <option value="">Seleccione Rol...</option>

                {roles.map(r => (
                  <option key={r.rolID} value={r.rolID}>
                    {r.nombreRol}
                  </option>
                ))}
              </select>
            </div>

            {/* ESTADO */}
            <div className="relative">
              <ToggleLeft className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

              <select
                name="estadoID"
                value={formData.estadoID || ""}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-2.5 bg-slate-200 rounded-xl shadow-[inset_2px_2px_5px_#c8d0e7] outline-none text-sm text-slate-700 appearance-none"
              >
                <option value="">Seleccione Estado...</option>

                {estados.map(e => (
                  <option key={e.estadoID} value={e.estadoID}>
                    {e.nombreEstado}
                  </option>
                ))}
              </select>
            </div>

            {/* CONTRASEÑA */}
            <NeumorphicField
              icon={Lock}
              name="contrasena"
              placeholder="Nueva contraseña (opcional)"
              type="password"
              value={formData.contrasena}
              onChange={handleChange}
              required={false}
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-slate-200 rounded-2xl shadow-lg hover:shadow-inner text-blue-600 font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Sincronizando..." : <><Save size={18} /> Guardar Cambios</>}
          </button>

        </form>

      </div>
    </div>
  );
}