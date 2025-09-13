import React from "react";

const NUM_LOGOS = 12;
const logos = Array.from({ length: NUM_LOGOS });

// Generate random animation delays and positions for each logo
function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FloatingLogos() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {logos.map((_, i) => {
        const left = getRandom(0, 90); // vw
        const size = getRandom(40, 100); // px
        const duration = getRandom(18, 32); // seconds
        const delay = getRandom(0, 20); // seconds
        const opacity = getRandom(0.07, 0.15);
        return (
          <img
            key={i}
            src="/solanaLogo.png"
            alt="Floating Logo"
            style={{
              left: `${left}vw`,
              width: `${size}px`,
              opacity,
              animation: `floatY ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              top: `-${size}px`,
            }}
            className="absolute select-none"
          />
        );
      })}
      <style jsx global>{`
        @keyframes floatY {
          0% { transform: translateY(110vh); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
