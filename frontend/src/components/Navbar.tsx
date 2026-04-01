interface NavbarProps {
  onOpenModal: () => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-40 px-8 lg:px-24 py-6 flex flex-col md:flex-row justify-between items-center bg-[#0a0a0a] border-b border-white/5 shadow-md">
      {/* Logo */}
      <a href="#" className="flex flex-col items-center cursor-pointer">
        <img src="/logo.png" alt="Captain Barbearia Logo" className="h-14 w-14 mb-2 rounded-full border-2 border-[var(--color-primary)] shadow-[0_0_15px_rgba(212,175,55,0.3)] object-cover" />
        <h1 className="text-2xl font-serif font-bold text-white tracking-wider uppercase">
          Captain Barbearia
        </h1>
        <div className="flex items-center space-x-2 mt-1">
          <span className="h-[1px] w-4 bg-[var(--color-primary)]"></span>
          <span className="text-[10px] text-[var(--color-primary)] uppercase tracking-[0.2em]">Barbearia & Club</span>
          <span className="h-[1px] w-4 bg-[var(--color-primary)]"></span>
        </div>
      </a>

      {/* Links (Desktop) */}
      <ul className="hidden md:flex space-x-8 text-sm font-medium tracking-wide text-white/90 mt-4 md:mt-0 items-center">
        <li>
          <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
            Home
          </a>
        </li>
        <li>
          <a href="#servicos" className="hover:text-[var(--color-primary)] transition-colors">
            Serviços
          </a>
        </li>
        <li>
          <a href="#equipe" className="hover:text-[var(--color-primary)] transition-colors">
            Profissionais
          </a>
        </li>
        <li>
          <button 
            onClick={onOpenModal}
            className="text-[var(--color-primary)] font-bold transition-transform hover:scale-105"
          >
            Agendar
          </button>
        </li>
      </ul>
    </nav>
  );
}
