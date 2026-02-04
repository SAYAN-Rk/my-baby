import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Teddy from '../components/Teddy';

export default function ProposalPage() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [noHover, setNoHover] = useState(false);

  useEffect(() => {
    // Create falling hearts background
    const container = document.querySelector('.hearts-container');
    if (container) {
      for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.position = 'fixed';
        heart.style.fontSize = Math.random() * 15 + 15 + 'px';
        heart.style.opacity = '0.7';
        heart.style.pointerEvents = 'none';
        heart.style.top = '-30px';
        container.appendChild(heart);
      }
    }
  }, []);

  const handleYes = () => {
    setShowConfetti(true);
    // Create confetti
    createConfetti();
    setTimeout(() => {
      navigate('/teddy');
    }, 1500);
  };

  const handleNoHover = (e: React.MouseEvent) => {
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;
    setNoBtnPosition({ x: randomX, y: randomY });
    setNoHover(true);
    // stop nod after a while
    setTimeout(() => setNoHover(false), 1200);
  };

  const createConfetti = () => {
    const colors = ['#ff1744', '#ff6b9d', '#ffb6c1', '#ffc0cb', '#ff69b4'];
    
    for (let i = 0; i < 60; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '50%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 10 + 5 + 'px';
      confetti.style.height = confetti.style.width;
      confetti.style.borderRadius = '50%';
      confetti.style.position = 'fixed';
      confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-100 to-nude-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="hearts-container absolute inset-0 pointer-events-none" />
      
      <div className="max-w-2xl w-full">
        <div className="bg-contrast rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-in fade-in zoom-in duration-700" style={{ backgroundColor: 'var(--contrast)' }}>
          {/* Decorative elements */}
          <div className="flex justify-center gap-4 mb-8 text-4xl animate-bounce-gentle">
            <span className="animate-pulse">🌹</span>
            <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>💐</span>
            <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>🌹</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent animate-pulse-heart">
            💕 Will You Be My Valentine? 💕
          </h1>

          {/* Decorative line */}
          <div className="h-1 bg-gradient-to-r from-pink-300 via-red-400 to-pink-300 rounded-full mb-8 w-48 mx-auto" />

          {/* Love Message */}
          <div className="space-y-4 mb-10 text-lg md:text-xl text-gray-700">
            <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              ✨ Every moment with you feels like a beautiful dream
            </p>
            <p className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              💖 You make my heart skip a beat every single day
            </p>
            <p className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              🌟 Life is infinitely more beautiful with you by my side
            </p>
            <p className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              💝 You're my favorite person in the whole world
            </p>
          </div>

          {/* Decorative hearts */}
          <div className="flex justify-center gap-6 mb-12 text-5xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>💕</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💗</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💖</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💗</span>
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>💕</span>
          </div>

          {/* Teddy that nods on No hover and becomes happy on Yes */}
          <div style={{ position: 'absolute', left: 24, bottom: 28 }}>
            <div>
              {/* animated Teddy component */}
              <Teddy size={74} bounce={!noHover && !showConfetti} nod={noHover} happy={showConfetti} />
            </div>
          </div>

          {/* Question */}
          <p className="text-2xl font-bold text-gray-800 mb-10">
            So... what do you say? 🥰
          </p>

          {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button
              onClick={handleYes}
              className="px-12 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transform transition-all duration-300 active:scale-95"
            >
              YES! 💖
            </button>
            
            <button
              onMouseEnter={handleNoHover}
                onClick={handleNoHover}
              style={{
                transform: `translate(${noBtnPosition.x}px, ${noBtnPosition.y}px)`,
              }}
              className="px-12 py-4 bg-gray-200 text-gray-800 font-bold text-xl rounded-full shadow-lg hover:shadow-xl hover:bg-gray-300 transform transition-all duration-200"
            >
              No
            </button>
          </div>

          {/* Response Message */}
          {showConfetti && (
            <p className="text-2xl font-bold text-red-500 animate-bounce">
              🎉 You just made me the happiest! 🎉
            </p>
          )}

          {/* Bottom decoration */}
          <div className="mt-10 flex justify-center gap-3 text-3xl">
            <span className="animate-float">🎀</span>
            <span className="animate-float" style={{ animationDelay: '0.5s' }}>🎀</span>
            <span className="animate-float" style={{ animationDelay: '1s' }}>🎀</span>
          </div>
        </div>
      </div>
    </div>
  );
}
