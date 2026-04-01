export interface ServiceProps {
  name: string;
  price: number;
  imageUrl?: string;
}

export function ServiceCard({ name, price, imageUrl }: ServiceProps) {
  return (
    <div className="bg-black/80 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--color-primary)]/20 hover:-translate-y-2 border border-white/5 cursor-pointer group">
      {/* Imagem */}
      <div className="h-64 w-full relative">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="w-full h-full bg-[var(--color-surface)]"></div>
        )}
        
        {/* Degradê na imagem para destacar o texto */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
        
        {/* Título do Serviço e Tag de Preço no formato da imagem */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
          <h3 className="text-2xl font-bold text-white tracking-wide">{name}</h3>
          <div className="bg-[var(--color-primary)] text-black font-extrabold text-xl px-4 py-1">
            R${price}
          </div>
        </div>
      </div>
    </div>
  );
}
