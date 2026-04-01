import { useState } from 'react';

// Definimos o formato dos dados que vamos usar
type Service = { id: string; name: string; price: number; durationMinutes: number; };
type Barber = { id: string; name: string; };

interface BookingModalProps {
  isOpen: boolean;       // Controla se a janela (modal) está aberta ou fechada
  onClose: () => void;   // Função chamada quando queremos fechar a janela
}

const MOCK_MODAL_SERVICES = [
  { id: '1', name: 'Corte Clássico', price: 60, durationMinutes: 45 },
  { id: '2', name: 'Barba Terapia', price: 40, durationMinutes: 30 },
  { id: '3', name: 'Combo Imperador', price: 90, durationMinutes: 75 },
  { id: '4', name: 'Camuflagem de Fios', price: 55, durationMinutes: 30 },
  { id: '5', name: 'Limpeza de Pele', price: 80, durationMinutes: 30 },
  { id: '6', name: 'Tal Pai, Tal Filho', price: 110, durationMinutes: 60 },
];

const MOCK_BARBERS = [
  { id: '1', name: 'Roberto' },
  { id: '2', name: 'Thiago' },
];

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // ==========================================================
  // 1. ESTADOS (Memória temporária do componente)
  // ==========================================================
  
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Estados pré-carregados dos Mocks em vez de useEffect para evitar avisos de Lint
  const [services] = useState<Service[]>(MOCK_MODAL_SERVICES);
  const [barbers] = useState<Barber[]>(MOCK_BARBERS);
  
  // Deriva do estado (sempre que tiver ambos selecionados no passo certo)
  const availableTimes = (selectedDate && selectedBarber) 
    ? ['09:00', '10:30', '14:00', '15:30', '17:00'] 
    : [];

  // ==========================================================
  // 3. FUNÇÕES DE NAVEGAÇÃO
  // ==========================================================
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Ação final: Mandar tudo pro Back-end salvar!
  const handleConfirm = async () => {
    alert(`Agendamento Confirmado! Serviço: ${selectedService?.name}, Barbeiro: ${selectedBarber?.name}, Data: ${selectedDate} às ${selectedTime}`);
    onClose(); // Fecha a tela no final
    setStep(1); // Reseta para a próxima vez
  };

  // Se o modal não estiver aberto, não desenha/renderiza nada (null)
  if (!isOpen) return null;

  // ==========================================================
  // 4. DESENHO DA TELA (Renderização do HTML/React)
  // ==========================================================
  return (
    // Fundo escurecido atrás do Modal
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      
      {/* A Caixa Principal do Modal */}
      <div className="bg-[var(--color-surface)] w-full max-w-xl rounded-2xl border border-[var(--color-primary)]/30 overflow-hidden shadow-2xl">
        
        {/* Cabeçalho do Modal */}
        <div className="bg-black/40 p-6 flex justify-between items-center border-b border-white/10">
          <h2 className="text-2xl font-serif text-[var(--color-primary)]">Agendar Horário</h2>
          {/* Botão de Fechar 'X' */}
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-bold leading-none">&times;</button>
        </div>

        {/* Corpo: Exibimos conteúdo diferente dependendo do "step" (passo) atual */}
        <div className="p-6 h-[400px] overflow-y-auto">
          
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-lg mb-4 text-white">1. Qual serviço você deseja?</h3>
              <div className="space-y-3">
                {services.map(srv => (
                  <button 
                    key={srv.id}
                    onClick={() => { setSelectedService(srv); nextStep(); }}
                    className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-[var(--color-primary)]/50 bg-black/20 hover:bg-black/40 transition-all flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-white">{srv.name}</p>
                      <p className="text-sm text-gray-400">{srv.durationMinutes} minutos</p>
                    </div>
                    <span className="text-[var(--color-primary)] font-bold">R$ {srv.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-lg mb-4 text-white">2. Escolha o Especialista</h3>
              <div className="space-y-3">
                {barbers.map(barber => (
                  <button 
                    key={barber.id}
                    onClick={() => { setSelectedBarber(barber); nextStep(); }}
                    className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-[var(--color-primary)]/50 bg-black/20 hover:bg-black/40 transition-all"
                  >
                    <p className="font-bold text-white">{barber.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-lg mb-4 text-white">3. Para qual dia?</h3>
              <input 
                type="date"
                className="w-full p-4 rounded-xl border border-white/10 bg-black/40 text-white focus:outline-none focus:border-[var(--color-primary)] text-lg"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // Não deixa escolher dias no passado
              />
              <button 
                disabled={!selectedDate}
                onClick={nextStep}
                className="mt-6 w-full btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ver Horários Disponíveis
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <h3 className="text-lg mb-4 text-white">4. Selecione o Horário</h3>
              {availableTimes.length === 0 ? (
                <p className="text-gray-400">Nenhum horário livre para este dia.</p>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {availableTimes.map(time => (
                    <button 
                      key={time}
                      onClick={() => { setSelectedTime(time); nextStep(); }}
                      className="p-3 text-center rounded-lg border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)] hover:text-black font-semibold transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="animate-fade-in text-center flex flex-col items-center justify-center h-full">
              <h3 className="text-2xl font-serif text-[var(--color-primary)] mb-6">Revisão do Agendamento</h3>
              <div className="bg-black/30 w-full p-6 rounded-xl text-left border border-white/5 space-y-2 mb-8">
                <p><span className="text-gray-400">Serviço:</span> <strong className="text-white">{selectedService?.name}</strong></p>
                <p><span className="text-gray-400">Profissional:</span> <strong className="text-white">{selectedBarber?.name}</strong></p>
                <p><span className="text-gray-400">Data e Hora:</span> <strong className="text-white">{selectedDate.split('-').reverse().join('/')} às {selectedTime}</strong></p>
                <div className="h-px bg-white/10 my-4" />
                <p className="text-xl text-[var(--color-primary)] font-bold text-center">Total: R$ {selectedService?.price}</p>
              </div>
              <button onClick={handleConfirm} className="w-full btn-gold">
                Confirmar e Agendar
              </button>
            </div>
          )}

        </div>

        {/* Rodapé: Botão de voltar */}
        <div className="bg-black/40 p-4 border-t border-white/10 flex justify-between">
          {step > 1 ? (
            <button onClick={prevStep} className="text-gray-400 hover:text-white px-4 py-2">&larr; Voltar</button>
          ) : (
            <div></div> // Espaço vazio para alinhar o flexbox
          )}
          <span className="text-gray-600 self-center text-sm">Passo {step} de 5</span>
        </div>

      </div>
    </div>
  );
}
