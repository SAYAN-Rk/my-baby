import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeddyPage() {
  const navigate = useNavigate();
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [heartCount, setHeartCount] = useState(0);

  useEffect(() => {
    // Generate floating hearts around the teddy
    const interval = setInterval(() => {
      const newHeart = {
        id: heartCount,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
      };
      setHearts(prev => [...prev.slice(-10), newHeart]);
      setHeartCount(prev => prev + 1);
    }, 300);

    return () => clearInterval(interval);
  }, [heartCount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating hearts background */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="fixed text-4xl animate-bounce pointer-events-none"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animation: 'float 3s ease-in-out forwards',
            opacity: 0.8,
          }}
        >
          💕
        </div>
      ))}

      <div className="max-w-2xl w-full">
        <div className="bg-contrast rounded-3xl shadow-2xl p-8 md:p-12 text-center" style={{ backgroundColor: 'var(--contrast)' }}>
          {/* Decorative top */}
          <div className="text-6xl md:text-7xl mb-8 animate-pulse">
            🧸
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
            YES! 💕
          </h1>

          {/* Message from teddy */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 mb-8 border-2 border-pink-200">
            <p className="text-2xl font-bold text-gray-800 mb-4">
              🧸 The teddy says...
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
              "I'm so happy you said YES! She's excited to celebrate this special moment with you! 🎉"
            </p>
            <p className="text-lg font-semibold text-pink-600">
              You've just made this the best Valentine's Day ever! 💖
            </p>
          </div>

          {/* Fun elements */}
          <div className="flex justify-center gap-8 text-5xl mb-10">
            <span className="animate-bounce">🌹</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💐</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🌹</span>
          </div>

          {/* Confetti effect text */}
          <div className="mb-10">
            <p className="text-xl font-bold text-red-500 mb-3">
              ✨ Celebrate with more moments ✨
            </p>
            <p className="text-gray-600">
              Ready to see some beautiful memories together?
            </p>
          </div>

          {/* Decorative hearts grid */}
          <div className="grid grid-cols-5 gap-2 mb-10">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="text-2xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                💗
              </div>
            ))}
          </div>

          {/* Navigation button */}
          <button
            onClick={() => navigate('/slideshow')}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 active:scale-95"
          >
            View Our Memories →
          </button>

          {/* Bottom decoration */}
          <div className="mt-10 flex justify-center gap-2 text-4xl">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                🎀
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
