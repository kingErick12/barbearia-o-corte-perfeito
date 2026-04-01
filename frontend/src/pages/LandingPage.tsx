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
  { id: 4, name: "Camuflagem", price: 55, imageUrl: "/images/camuflagem.png" },
  { id: 5, name: "Limpeza Facial", price: 80, imageUrl: "/images/limpeza.png" },
  { id: 6, name: "Pai e Filho", price: 110, imageUrl: "/images/pai_filho.png" },
];

const MOCK_TEAM = [
  { id: 1, name: "Roberto", imageUrl: "https://images.unsplash.com/photo-1520283414846-9524dc5567b5?q=80&w=400&auto=format&fit=crop", rating: 5 },
  { id: 2, name: "Thiago", imageUrl: "https://images.unsplash.com/photo-1554101072-a1f94d930fe3?q=80&w=400&auto=format&fit=crop", rating: 5 },
  { id: 3, name: "Leo", imageUrl: "https://images.unsplash.com/photo-1588636254190-6421c97a47ef?q=80&w=400&auto=format&fit=crop", rating: 4.8 },
  { id: 4, name: "Felipe", imageUrl: "https://images.unsplash.com/photo-1622285816962-d27806ce59fd?q=80&w=400&auto=format&fit=crop", rating: 5 },
];

export function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-surface)] relative">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <Hero onOpenModal={() => setIsModalOpen(true)} />
      
      <section id="servicos" className="min-h-screen pt-32 pb-24 px-8 lg:px-24 bg-[var(--color-surface)]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-serif tracking-wide">Nossos Serviços</h2>
          <div className="h-1 w-16 bg-[var(--color-primary)] mx-auto mt-4 rounded-full"></div>
          <p className="text-[var(--color-textSc)] max-w-xl mx-auto mt-6">Escolha o serviço perfeito. Nossa equipe é mestre em tesoura, navalha e máquina.</p>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-serif tracking-wide">Nossa Equipe</h2>
          <div className="h-1 w-16 bg-[var(--color-primary)] mx-auto mt-4 rounded-full"></div>
          <p className="text-[var(--color-textSc)] max-w-xl mx-auto mt-6">Conheça nossos especialistas formados na velha e nova escola da barbearia.</p>
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

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}

export default LandingPage;
