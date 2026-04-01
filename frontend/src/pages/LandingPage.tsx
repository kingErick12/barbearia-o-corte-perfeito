import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { ServiceCard } from '../components/ServiceCard'
import { TeamCard } from '../components/TeamCard'
import { BookingModal } from '../components/BookingModal'

// ... (MOCK arrays unchanged)
const MOCK_SERVICES = [
  { id: 1, name: "Corte Clássico", price: 60, imageUrl: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Barba Terapia", price: 40, imageUrl: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Combo Imperador", price: 90, imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "Camuflagem", price: 55, imageUrl: `${import.meta.env.BASE_URL}images/camuflagem.png` },
  { id: 5, name: "Limpeza Facial", price: 80, imageUrl: `${import.meta.env.BASE_URL}images/limpeza.png` },
  { id: 6, name: "Pai e Filho", price: 110, imageUrl: `${import.meta.env.BASE_URL}images/pai_filho.png` },
];

const MOCK_TEAM = [
  { id: 1, name: "Menot", imageUrl: "https://images.unsplash.com/photo-1520283414846-9524dc5567b5?q=80&w=400&auto=format&fit=crop", rating: 5 },
  { id: 2, name: "Pedro", imageUrl: "https://images.unsplash.com/photo-1554101072-a1f94d930fe3?q=80&w=400&auto=format&fit=crop", rating: 5 },
];

export function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-surface)] relative">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <Hero onOpenModal={() => setIsModalOpen(true)} />
      
      <section id="servicos" className="min-h-screen pt-32 pb-24 px-8 lg:px-24 bg-[var(--color-surface)]">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white font-serif tracking-wide">Nossos Serviços</h2>
          <div className="h-2 w-20 bg-[var(--color-primary)] mx-auto mt-4 rounded-full"></div>
          <p className="text-[var(--color-textSc)] text-lg md:text-xl max-w-xl mx-auto mt-6">Escolha o serviço perfeito. Nossa equipe é mestre em tesoura, navalha e máquina.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {MOCK_SERVICES.map(service => (
            <ServiceCard 
              key={service.id}
              name={service.name}
              price={service.price}
              imageUrl={service.imageUrl}
            />
          ))}
        </div>
      </section>

      <section id="equipe" className="min-h-screen pt-32 pb-24 px-8 lg:px-24 bg-[var(--color-surface)]">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white font-serif tracking-wide">Nossa Equipe</h2>
          <div className="h-2 w-20 bg-[var(--color-primary)] mx-auto mt-4 rounded-full"></div>
          <p className="text-[var(--color-textSc)] text-lg md:text-xl max-w-xl mx-auto mt-6">Conheça nossos especialistas formados na velha e nova escola da barbearia.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {MOCK_TEAM.map(barber => (
            <TeamCard 
              key={barber.id}
              name={barber.name}
              imageUrl={barber.imageUrl}
              rating={barber.rating}
            />
          ))}
        </div>
      </section>

      {/* Footer / Contatos & Criador */}
      <footer className="bg-[#050505] py-16 px-8 border-t border-[var(--color-primary)]/20 text-center flex flex-col items-center">
        
        {/* Barbearia Social */}
        <div className="mb-16 flex flex-col items-center">
          <h3 className="text-3xl md:text-4xl text-white font-serif mb-6">Acompanhe a Máfia no Instagram</h3>
          <a href="https://www.instagram.com/captainbarbearia" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_25px_rgba(225,48,108,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <span>@captainbarbearia</span>
          </a>
        </div>

        {/* Separator */}
        <div className="w-full max-w-md h-[1px] bg-white/10 mb-12"></div>

        {/* Desenvolvedor */}
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6">
          <p className="text-[var(--color-textSc)] text-lg md:text-xl font-medium tracking-wide">
            Desenvolvido com excelência por <strong className="text-[var(--color-primary)] text-xl md:text-2xl">Erick</strong>
          </p>
          <div className="flex space-x-10 mt-6">
            <a href="https://www.instagram.com/erick_fernando_lx/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-textSc)] hover:text-[var(--color-primary)] transition-colors transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.linkedin.com/in/erick-fernando-de-jesus-silva-49575a29a" target="_blank" rel="noopener noreferrer" className="text-[var(--color-textSc)] hover:text-[var(--color-primary)] transition-colors transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
          <p className="text-white/30 text-sm mt-8">
            © {new Date().getFullYear()} Captain Barbearia. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}

export default LandingPage;
