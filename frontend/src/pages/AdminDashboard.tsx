import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, Users, Scissors } from 'lucide-react';

// Dados MOCK para visualização do fluxo antes da API real estar ligada
const MOCK_APPOINTMENTS = [
  { id: 1, clientName: 'Carlos Silva', service: 'Corte Clássico', time: '14:00', barber: 'Menot', status: 'CONFIRMED' },
  { id: 2, clientName: 'Marcos Paulo', service: 'Barba Terapia', time: '14:45', barber: 'Menot', status: 'CONFIRMED' },
  { id: 3, clientName: 'Rafael Gomes', service: 'Combo Imperador', time: '15:30', barber: 'Pedro', status: 'CONFIRMED' },
  { id: 4, clientName: 'João Pedro', service: 'Limpeza Facial', time: '17:00', barber: 'Menot', status: 'PENDING' },
];

export function AdminDashboard() {
  const [role] = useState<string | null>(() => localStorage.getItem('role'));
  const navigate = useNavigate();

  useEffect(() => {
    // Se não tiver papel armazenado, redireciona para login
    if (!role) {
      navigate('/admin');
    }
  }, [role, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/admin');
  };

  // Se for Barbeiro comum, vê só os agendamentos do 'Menot' (exemplo mockado)
  const visibleAppointments = role === 'ADMIN' 
    ? MOCK_APPOINTMENTS 
    : MOCK_APPOINTMENTS.filter(a => a.barber === 'Menot');

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-white">
      {/* Top Navbar do Admin */}
      <nav className="bg-[#0a0a0a] border-b border-white/5 py-4 px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-serif font-bold text-[var(--color-primary)] uppercase tracking-wider">
            Captain Barbearia <span className="text-white ml-2 text-sm">| Portal da Equipe</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <span className="text-sm text-[var(--color-textSc)]">
            Logado como: <strong className="text-white">{role === 'ADMIN' ? 'Dono (Admin)' : 'Barbeiro'}</strong>
          </span>
          <button 
            onClick={handleLogout}
            className="flex items-center text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto animate-fade-in">
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#111] p-6 rounded-sm border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[var(--color-textSc)] text-sm uppercase tracking-wider mb-1">Agendamentos Hoje</p>
              <p className="text-3xl font-bold">{visibleAppointments.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
              <Calendar className="text-[var(--color-primary)] w-6 h-6" />
            </div>
          </div>
          
          <div className="bg-[#111] p-6 rounded-sm border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[var(--color-textSc)] text-sm uppercase tracking-wider mb-1">Receita Prevista</p>
              <p className="text-3xl font-bold text-[var(--color-primary)]">R$ 380</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
              <Scissors className="text-[var(--color-primary)] w-6 h-6" />
            </div>
          </div>

          {role === 'ADMIN' && (
            <div className="bg-[#111] p-6 rounded-sm border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[var(--color-textSc)] text-sm uppercase tracking-wider mb-1">Equipe Ativa</p>
                <p className="text-3xl font-bold">4</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                <Users className="text-[var(--color-primary)] w-6 h-6" />
              </div>
            </div>
          )}
        </div>

        {/* Appointments Table */}
        <div className="bg-[#111] rounded-sm border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-xl font-bold font-serif">Sua Agenda - Hoje</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0a0a0a] text-[var(--color-textSc)] text-sm uppercase tracking-wider">
                  <th className="p-4 font-normal">Horário</th>
                  <th className="p-4 font-normal">Cliente</th>
                  <th className="p-4 font-normal">Serviço</th>
                  {role === 'ADMIN' && <th className="p-4 font-normal">Barbeiro</th>}
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {visibleAppointments.map(apt => (
                  <tr key={apt.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-medium text-[var(--color-primary)]">{apt.time}</td>
                    <td className="p-4 font-bold">{apt.clientName}</td>
                    <td className="p-4 text-gray-300">{apt.service}</td>
                    {role === 'ADMIN' && <td className="p-4 text-gray-400">{apt.barber}</td>}
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        apt.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {apt.status === 'CONFIRMED' ? 'Confirmado' : 'Aguardando'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-xs uppercase tracking-wider text-[var(--color-textSc)] hover:text-white transition-colors">
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {visibleAppointments.length === 0 && (
              <div className="p-10 text-center text-gray-500">
                <p>Nenhum agendamento encontrado para hoje.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
