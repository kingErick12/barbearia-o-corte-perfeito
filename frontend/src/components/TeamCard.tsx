export interface BarberProps {
  name: string;
  imageUrl: string;
  rating: number;
  reviewsCount?: number;
}

export function TeamCard({ name, imageUrl, rating }: BarberProps) {
  return (
    <div className="bg-[#111] px-6 py-8 rounded-lg text-center border border-white/5 flex flex-col items-center">
      <div className="w-48 h-48 mb-6 rounded-full overflow-hidden border-2 border-[var(--color-primary)]/50 p-1">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover rounded-full" 
        />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{name}</h3>
      <div className="flex space-x-1 items-center justify-center">
        {/* Simple mock stars based on rating */}
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-[var(--color-primary)]' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-[var(--color-textSc)] text-xs uppercase tracking-widest mt-4">Especialista</p>
    </div>
  );
}
