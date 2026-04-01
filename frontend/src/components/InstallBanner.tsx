import { useState, useEffect } from 'react';
import { Download, X, Share } from 'lucide-react';

export function InstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');

  useEffect(() => {
    // 1. Verificar se ja esta instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');

    if (isStandalone) return;

    // 2. Detectar Plataforma
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/android/.test(userAgent)) {
      setPlatform('android');
    }

    // 3. Capturar evento de instalacao (Android/Chrome)
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Para iOS, mostramos apos 3 segundos
    if (/iphone|ipad|ipod/.test(userAgent)) {
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowBanner(false);
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-32px)] max-w-sm animate-fade-in">
      <div className="bg-[#111] border border-[var(--color-primary)]/30 shadow-2xl rounded-2xl p-5 relative overflow-hidden group">
        {/* Glow Effect */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--color-primary)]/10 blur-3xl rounded-full"></div>
        
        <button 
          onClick={() => setShowBanner(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-black rounded-xl border border-white/10 flex items-center justify-center flex-shrink-0 shadow-inner">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="w-8 h-8 object-contain" />
          </div>
          
          <div className="flex-1">
            <h4 className="text-white font-bold text-sm tracking-tight mb-1">
              Capitão, agende pelo App!
            </h4>
            <p className="text-[var(--color-textSc)] text-xs leading-relaxed mb-4">
              Instale agora para ter acesso rápido e notificações exclusivas.
            </p>

            {platform === 'ios' ? (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 text-[var(--color-primary)] font-bold text-[10px] uppercase tracking-widest bg-[var(--color-primary)]/5 p-2 rounded-lg border border-[var(--color-primary)]/10">
                  <Share size={14} className="animate-bounce" />
                  <span>Clique em "Compartilhar" e "Tela de Início"</span>
                </div>
                {/* Alerta de Safari */}
                <p className="text-[8px] text-gray-500 text-center uppercase tracking-tighter">
                  Nota: No iPhone, a instalação só funciona pelo navegador <span className="text-white font-bold underline">Safari</span>.
                </p>
              </div>
            ) : (
              <button 
                onClick={handleInstallClick}
                className="w-full bg-[var(--color-primary)] text-black font-black text-xs uppercase py-3 rounded-lg flex items-center justify-center space-x-2 active:scale-95 transition-transform"
              >
                <Download size={14} />
                <span>Instalar Aplicativo</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
