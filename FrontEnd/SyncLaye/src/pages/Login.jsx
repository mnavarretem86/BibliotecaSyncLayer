import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="
      min-h-screen
      bg-slate-200
      flex flex-col items-center justify-center
      p-6
      font-sans
      antialiased
      text-slate-900
    ">

      {/* PANEL PRINCIPAL (Depth Layer 1 - hundido) */}
      <div className="
        w-full max-w-sm
        p-10
        rounded-3xl
        bg-slate-200
        shadow-[inset_8px_8px_16px_#c8d0e7,inset_-8px_-8px_16px_#ffffff]
      ">

        <header className="text-center mb-10">
          <h2 className="text-2xl font-light tracking-tight text-slate-900 mb-2">
            Bienvenido a <span className="font-semibold text-blue-600">SyncLayer</span>
          </h2>

          <p className="text-slate-500 text-sm font-light">
            Introduce tus credenciales para continuar
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-[0.1em] font-semibold text-slate-500 ml-1">
              Correo Electrónico
            </label>

            <input
              type="email"
              required
              placeholder="isaac@udem.edu.ni"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full px-5 py-3
                rounded-2xl
                bg-slate-200
                shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff]
                outline-none
                text-slate-700
                placeholder:text-slate-400
              "
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-[0.1em] font-semibold text-slate-500 ml-1">
              Contraseña
            </label>

            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full px-5 py-3
                rounded-2xl
                bg-slate-200
                shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff]
                outline-none
                text-slate-700
                placeholder:text-slate-400
              "
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-4 mt-4
              rounded-2xl
              font-medium
              bg-slate-200
              shadow-[6px_6px_12px_#c8d0e7,-6px_-6px_12px_#ffffff]
              hover:shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff]
              transition-all duration-300
              disabled:opacity-50
            "
          >
            {loading ? "Verificando..." : "Entrar ahora"}
          </button>

        </form>

        <footer className="mt-10 text-center">
          <Link 
            to="/" 
            className="text-xs text-slate-500 hover:text-blue-600 transition-colors tracking-wide"
          >
            ← Volver al inicio
          </Link>
        </footer>

      </div>

    </div>
  );
}
