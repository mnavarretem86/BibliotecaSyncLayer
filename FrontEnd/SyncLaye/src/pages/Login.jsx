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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans antialiased text-slate-900">
      
      <div className="w-full max-w-sm">
        
        <header className="text-center mb-10">
          <h2 className="text-2xl font-light tracking-tight text-slate-950 mb-2">
            Bienvenido a <span className="font-semibold text-blue-600">SyncLayer</span>
          </h2>
          <p className="text-slate-400 text-sm font-light">
            Introduce tus credenciales para continuar
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-[0.1em] font-semibold text-slate-400 ml-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              placeholder="isaac@udem.edu.ni"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all text-slate-700 placeholder:text-slate-300"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-[0.1em] font-semibold text-slate-400 ml-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all text-slate-700 placeholder:text-slate-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 rounded-2xl font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 transition-all active:scale-[0.98] shadow-sm"
          >
            {loading ? "Verificando..." : "Entrar ahora"}
          </button>
        </form>

        <footer className="mt-10 text-center">
          <Link 
            to="/" 
            className="text-xs text-slate-400 hover:text-blue-600 transition-colors tracking-wide"
          >
            ← Volver al inicio
          </Link>
        </footer>

      </div>
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20"></div>
    </div>
  );
}