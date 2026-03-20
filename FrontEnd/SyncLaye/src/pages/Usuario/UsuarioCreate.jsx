import { X, Shield, Lock, Save, Search } from "lucide-react";
import { useCreateUsuario } from "../../hooks/Usuario/useCreateUsuario";

export default function UsuarioCreate({ isOpen, onClose, onRefresh }) {

  const {
    formData,
    personas,
    roles,
    searchPersona,
    setSearchPersona,
    showPersonas,
    setShowPersonas,
    loading,
    handleChange,
    handleSelectPersona,
    handleCreate
  } = useCreateUsuario(onRefresh, onClose);

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
          Crear <span className="font-bold text-blue-600">Nuevo Usuario</span>
        </h2>

        <form onSubmit={handleCreate} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* BUSCAR PERSONA */}
            <div className="relative md:col-span-2">

              <Search className="absolute left-4 top-3 text-slate-400" size={16} />

              <input
                placeholder="Buscar persona..."
                value={searchPersona}
                onChange={(e) => {
                  setSearchPersona(e.target.value);
                  setShowPersonas(true);
                }}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-200 rounded-xl shadow-[inset_2px_2px_5px_#c8d0e7] outline-none text-sm"
              />

              {showPersonas && searchPersona && (
                <div className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-lg max-h-40 overflow-y-auto">

                  {personas.length === 0 && (
                    <div className="px-4 py-2 text-slate-400 text-sm">
                      No se encontraron personas
                    </div>
                  )}

                  {personas.map(p => (
                    <div
                      key={p.personaID}
                      onClick={() => handleSelectPersona(p)}
                      className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm"
                    >
                      {p.primerNombre} {p.primerApellido}
                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* ROL */}
            <div className="relative">

              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

              <select
                name="rolID"
                value={formData.rolID || ""}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-2.5 bg-slate-200 rounded-xl shadow-[inset_2px_2px_5px_#c8d0e7] outline-none text-sm"
              >
                <option value="">Seleccione Rol...</option>

                {roles.map(r => (
                  <option key={r.rolID} value={r.rolID}>
                    {r.nombreRol}
                  </option>
                ))}
              </select>

            </div>

            {/* CONTRASEÑA */}
            <div className="relative">

              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

              <input
                required
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                value={formData.contrasena || ""}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-200 rounded-xl shadow-[inset_2px_2px_5px_#c8d0e7]"
              />

            </div>

            {/* CONFIRMAR CONTRASEÑA */}
            <div className="relative">

              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

              <input
                required
                type="password"
                name="confirmarContrasena"
                placeholder="Confirmar contraseña"
                value={formData.confirmarContrasena || ""}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-200 rounded-xl shadow-[inset_2px_2px_5px_#c8d0e7]"
              />

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-slate-200 rounded-2xl shadow-lg hover:shadow-inner text-blue-600 font-bold transition-all"
          >
            {loading ? "Creando..." : <><Save size={18}/> Crear Usuario</>}
          </button>

        </form>

      </div>

    </div>
  );
}