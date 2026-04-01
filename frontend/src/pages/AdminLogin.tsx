import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulando login para visualização do front-end por enquanto
    if (email.includes('admin')) {
      localStorage.setItem('role', 'ADMIN');
    } else {
      localStorage.setItem('role', 'BARBER');
    }
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)] px-4">
      {/* Imagem de Fundo Desfocada */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2000&auto=format&fit=crop")' }}
      />
      
      <div className="relative z-10 w-full max-w-md bg-[#0a0a0a] border border-white/5 shadow-2xl rounded-sm overflow-hidden animate-fade-in p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-white tracking-wider uppercase mb-2">
            Acesso Restrito
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <span className="h-[1px] w-8 bg-[var(--color-primary)]"></span>
            <span className="text-xs text-[var(--color-primary)] uppercase tracking-[0.2em] font-light">Painel do Clube</span>
            <span className="h-[1px] w-8 bg-[var(--color-primary)]"></span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--color-textSc)] mb-2">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-primary)]" />
              <input 
                type="email" 
                required
                className="w-full bg-[#111] border border-white/10 rounded-sm py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-700"
                placeholder="barbeiro@ocorteperfeito.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--color-textSc)] mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-primary)]" />
              <input 
                type="password" 
                required
                className="w-full bg-[#111] border border-white/10 rounded-sm py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-700"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full btn-gold py-4 flex items-center justify-center gap-2 group mt-8"
          >
            Acessar Agenda
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-8">
          Sistema exclusivo para a equipe O Corte Perfeito.
        </p>
      </div>
    </div>
  );
}
