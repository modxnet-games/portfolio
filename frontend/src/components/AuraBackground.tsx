import { useMemo } from 'react';

export default function AuraBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 0.8,
        duration: Math.random() * 25 + 20,
        delay: Math.random() * 25,
        opacity: Math.random() * 0.2 + 0.05,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Aurora orbs — reduced opacity */}
      <div
        className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full"
        style={{
          top: '10%',
          left: '15%',
          background: 'radial-gradient(circle, rgba(0,255,204,0.06) 0%, transparent 70%)',
          animation: 'aurora-drift 25s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full"
        style={{
          top: '50%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
          animation: 'aurora-drift-2 30s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full"
        style={{
          bottom: '10%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(244,63,94,0.03) 0%, transparent 70%)',
          animation: 'aurora-drift-3 22s ease-in-out infinite',
        }}
      />

      {/* Noise texture — very subtle */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating particles — fewer and subtler */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary-light"
          style={{
            left: p.left,
            bottom: '-5px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-particle ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
