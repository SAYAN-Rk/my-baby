import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function SlideshowPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState(420);

  // Your romantic photos (use the exact filenames you placed in /public/images)
  const images = [
    { image: '/images/photo1.jpg.jpeg', title: 'Memory 1', description: "A moment I'll cherish forever" },
    { image: '/images/photo2.jpg.jpeg', title: 'Memory 2', description: 'Beautiful days with you' },
    { image: '/images/photo3.jpg.jpeg', title: 'Memory 3', description: 'You make everything special' },
    { image: '/images/photo4.jpg.jpeg', title: 'Memory 4', description: 'Every moment counts' },
    { image: '/images/photo5.jpg.jpeg', title: 'Memory 5', description: "You're my favorite" },
    { image: '/images/photo6.jpg.jpeg', title: 'Memory 6', description: 'Forever with you' },
    { image: '/images/photo7.jpg.jpeg', title: 'Memory 7', description: 'Love grows stronger' },
    { image: '/images/photo8.jpg.jpeg', title: 'Memory 8', description: 'Our beautiful story' },
    { image: '/images/photo9.jpg.jpeg', title: 'Memory 9', description: 'Happily ever after' },
  ];

  const angleStep = 360 / images.length;

  // compute radius based on container width to avoid overlap and scale images nicely
  useEffect(() => {
    const compute = () => {
      if (!carouselRef.current) return;
      const w = carouselRef.current.clientWidth || 800;
      const newRadius = Math.max(260, Math.min(1200, Math.round(w * 0.62)));
      setRadius(newRadius);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const advance = () => setCurrentSlide((s) => (s + 1) % images.length);

  useEffect(() => {
    // autoplay timer: change slide every 4s
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(advance, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    // Attempt to play audio when on this page
    if (!audioRef.current) return;
    if (isPlaying && audioRef.current.src) {
      audioRef.current.play().catch(() => {
        // Autoplay likely blocked; user must tap the overlay play button
        setIsPlaying(false);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSlide]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: `linear-gradient(120deg, var(--peach-1), #ff6b6b)` }}>
      <div className="max-w-5xl w-full">
        <div className="bg-white/95 rounded-3xl shadow-2xl overflow-hidden">
          {/* Slideshow Container */}
          <div className="relative aspect-video flex items-center justify-center slide-container" style={{ background: 'linear-gradient(180deg, var(--peach-2), #ff7b7b)' }}>
            {/* 3D Carousel */}
            <div ref={carouselRef} className="carousel" style={{ transform: `rotateY(${-currentSlide * angleStep}deg)` }}>
              {images.map((img, idx) => {
                const angle = idx * angleStep;
                const isCurrent = idx === currentSlide;
                return (
                  <div
                    key={idx}
                    className={`carousel-item ${isCurrent ? 'current' : ''}`}
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px) translate(-50%, -50%) scale(${isCurrent ? 1 : 0.84})`,
                      opacity: isCurrent ? 1 : 0.55,
                      transitionDelay: `${isCurrent ? '0s' : '0s'}`,
                    }}
                  >
                    <img
                      src={img.image}
                      alt={img.title}
                      loading="lazy"
                      decoding="async"
                      className="pop-in"
                    />
                  </div>
                );
              })}
            </div>

n            {/* Overlay info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{images[currentSlide].title}</h2>
              <p className="text-lg">{images[currentSlide].description}</p>
            </div>

n            {/* Audio element (add /public/audio/ophalia.mp3) */}
            <audio ref={audioRef} src="/audio/ophalia.mp3" loop crossOrigin="anonymous" />

n            {/* Audio Controls Overlay */}
            <div style={{ position: 'absolute', left: 16, top: 16, display: 'flex', gap: 8, zIndex: 30 }}>
              <button onClick={toggleAudio} className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button onClick={toggleMute} className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            {/* Slide Counter */}
            <div className="absolute top-4 right-4" style={{ zIndex: 30 }}>
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-full font-bold">
                {currentSlide + 1} / {images.length}
              </div>
            </div>
          </div>

n          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 p-6 flex-wrap bg-white">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-red-500 w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 text-center bg-white">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Beautiful Moments 💕</h3>
            <p className="text-gray-600 text-lg mb-8">Every moment with you is a precious memory I want to cherish forever.</p>

n            <div className="flex justify-center gap-6 mb-8 text-4xl">
              <span className="animate-bounce">💕</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌹</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💕</span>
            </div>

n            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/teddy')} className="px-8 py-3 bg-gray-200 text-gray-800 font-bold rounded-full hover:bg-gray-300 transform transition-all duration-300 hover:scale-105">← Back</button>
              <button onClick={() => navigate('/playlist')} className="px-8 py-3 bg-gradient-to-r from-[#ffd8c2] to-[#ff6b6b] text-white font-bold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105">Listen to Our Song →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

