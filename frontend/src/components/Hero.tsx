interface HeroProps {
  onOpenModal: () => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Layer (Dark theme focused on the left) */}
      <div className="absolute inset-0 bg-[var(--color-background)] z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 md:from-black/80 to-[var(--color-background)]/50 z-10" />
        <div 
          className="absolute inset-0 opacity-50 bg-cover bg-center md:bg-right"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2000&auto=format&fit=crop")' }}
        />
      </div>

      {/* Content Aligned to Left like the mockup */}
      <div className="relative z-20 px-8 lg:px-24 w-full flex flex-col justify-center animate-fade-in">
        <h2 className="text-[var(--color-primary)] text-3xl md:text-4xl font-serif tracking-widest mb-2 font-bold uppercase drop-shadow-md">
          Captain Barbearia.
        </h2>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight max-w-2xl drop-shadow-xl">
          Estilo. Tradição. Qualidade.
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--color-textSc)] mb-10 max-w-xl font-light">
          Agende seu horário online e transforme seu visual.
        </p>

        <button 
          onClick={onOpenModal} 
          className="btn-gold group relative overflow-hidden w-fit text-sm tracking-wider uppercase"
        >
          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">Agendar Horário</span>
        </button>
      </div>
    </section>
  );
}
