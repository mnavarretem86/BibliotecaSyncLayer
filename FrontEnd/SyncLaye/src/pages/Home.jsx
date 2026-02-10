import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Book, 
  UserRound, 
  Tags, 
  Users, 
  UserCog, 
  LogOut, 
  ArrowRight,
  Handshake 
} from "lucide-react";

import Logo from "../img/Biblioteca.png"; // ✅ IMPORTAR LOGO

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const menuItems = [
    { name: "Libros", path: "/libros", icon: <Book size={22} /> },
    { name: "Préstamos", path: "/prestamos", icon: <Handshake size={22} /> },
    { name: "Autores", path: "/autores", icon: <UserRound size={22} /> },
    { name: "Categorías", path: "/categorias", icon: <Tags size={22} /> },
    { name: "Personas", path: "/personas", icon: <Users size={22} /> },
    { name: "Usuarios", path: "/usuarios", icon: <UserCog size={22} /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 py-20 font-sans antialiased text-slate-900 animate-in fade-in duration-700">
      <div className="w-full max-w-xl text-center">
        <header className="mb-12">



          {/* LOGO*/}
          <img 
            src={Logo} 
            alt="Logo Biblioteca" 
            className="mx-auto mb-1 w-80 h-auto drop-shadow-lg  rounded-2xl"
            />

{/* 
          <h1 className="text-3xl font-light tracking-tight text-slate-950 mb-2">
            Sync<span className="font-semibold text-blue-600">Layer</span>
          </h1> */}
          {/* <div className="h-1 w-8 bg-blue-600 mx-auto rounded-full"></div> */}
        </header>

        <main>
          {!user ? (
            <div className="space-y-8">
              <p className="text-slate-500 font-light text-lg leading-relaxed">
                Tu biblioteca digital <br />
              </p>
              <Link
                to="/login"
                className="group inline-flex items-center justify-center gap-2 px-10 py-3 font-medium text-white bg-slate-900 rounded-full transition-all hover:bg-slate-800 active:scale-95 shadow-sm"
              >
                Comenzar
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform " />
              </Link>
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <header className="mb-8 text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] mb-1 font-bold">Gestión Central</p>
                <h2 className="text-xl font-medium text-slate-800">
                  Hola, {user.primerNombre}
                </h2>
              </header>
              
            {/* Tarjetas */}
              <nav className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex flex-col items-center p-6 bg-white border border-slate-100 rounded-3xl hover:border-blue-100 hover:shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all group"
                  >
                    <div className="text-slate-400 group-hover:text-blue-600 mb-3 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-950 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </nav>

              <button 
                onClick={() => { sessionStorage.clear(); window.location.reload(); }}
                className="mt-12 inline-flex items-center gap-2 text-xs text-slate-300 hover:text-red-400 transition-colors uppercase tracking-[0.2em] font-semibold"
              >
                <LogOut size={14} />
                Cerrar Sesión
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
