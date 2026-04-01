interface NavbarProps {
  onOpenModal: () => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-40 px-8 lg:px-24 py-6 flex flex-col md:flex-row justify-between items-center bg-[#0a0a0a] border-b border-white/5 shadow-md">
      {/* Logo */}
      <a href="#" className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Captain Barbearia Logo" className="h-28 md:h-32 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
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
