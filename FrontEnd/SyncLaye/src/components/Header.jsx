import Logo from "../img/Biblioteca.png";

export default function Header({ user }) {
  return (
    <header className="w-full max-w-xl text-center mb-6">
      <div className="mb-6">
        <img 
          src={Logo} 
          alt="Logo Biblioteca" 
          className="mx-auto mb-1 w-80 h-auto rounded-2xl"
        />
      </div>

      {user && (
        <div className="animate-in fade-in zoom-in-95 duration-500 mb-8">
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] mb-1 font-bold">
            Gestión Central
          </p>
          <h2 className="text-xl font-medium text-slate-800">
            Hola, {user.primerNombre}
          </h2>
        </div>
      )}
    </header>
  );
}