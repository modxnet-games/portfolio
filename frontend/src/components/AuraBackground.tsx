import { useMemo } from 'react';

export default function AuraBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 20,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Aurora orbs */}
      <div
        className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full"
        style={{
          top: '10%',
          left: '15%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
          animation: 'aurora-drift 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full"
        style={{
          top: '50%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)',
          animation: 'aurora-drift-2 25s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full"
        style={{
          bottom: '10%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(244,63,94,0.06) 0%, transparent 70%)',
          animation: 'aurora-drift-3 18s ease-in-out infinite',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(168,130,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating particles */}
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
