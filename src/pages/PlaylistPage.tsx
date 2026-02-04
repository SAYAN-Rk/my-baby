import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Music } from 'lucide-react';
import Teddy from '../components/Teddy';

export default function PlaylistPage() {
  const navigate = useNavigate();
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playlist = [
    {
      id: 1,
      title: 'Darkhast',
      artist: 'Arijit Singh',
      emoji: '🎤',
      color: 'from-red-500 to-pink-500',
      audio: '/audio/song1.mp3',
    },
    {
      id: 2,
      title: 'Tum Ho Toh',
      artist: 'Vishal Mishra',
      emoji: '💕',
      color: 'from-pink-500 to-rose-500',
      audio: '/audio/song2.mp3',
    },
    {
      id: 3,
      title: 'Pehla Pyar',
      artist: 'Vishal-Sekhar',
      emoji: '🎵',
      color: 'from-rose-500 to-red-400',
      audio: '/audio/song3.mp3',
    },
    {
      id: 4,
      title: 'Be Intehaan',
      artist: 'Atif Aslam',
      emoji: '🌹',
      color: 'from-red-400 to-pink-600',
      audio: '/audio/song4.mp3',
    },
    {
      id: 5,
      title: 'Raanjhanaa',
      artist: 'A. R. Rahman',
      emoji: '💖',
      color: 'from-pink-600 to-rose-600',
      audio: '/audio/song5.mp3',
    },
    {
      id: 6,
      title: 'Apna Bana Le',
      artist: 'Arijit Singh',
      emoji: '🎶',
      color: 'from-purple-500 to-pink-500',
      audio: '/audio/song6.mp3',
    },
    {
      id: 7,
      title: 'Aankhiya Gulab',
      artist: 'Mitraz',
      emoji: '💑',
      color: 'from-red-500 to-purple-500',
      audio: '/audio/song7.mp3',
    },
    {
      id: 8,
      title: 'Preet Re',
      artist: 'Darshan Raval',
      emoji: '🌧️',
      color: 'from-blue-500 to-pink-500',
      audio: '/audio/song8.mp3',
    },
  ];

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying && currentSong !== null) {
      audioRef.current.play().catch(() => {
        console.log('Audio file not found. Please add MP3 files to /public/audio/');
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const togglePlay = (songId: number) => {
    if (currentSong === songId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(songId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-100 to-nude-100 flex items-center justify-center p-4 pb-20">
      <audio
        ref={audioRef}
        src={currentSong ? playlist.find(s => s.id === currentSong)?.audio : ''}
        crossOrigin="anonymous"
      />

      <div className="max-w-2xl w-full">
        <div className="bg-contrast rounded-3xl shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--contrast)' }}>
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-8 md:p-12 text-center text-white">
            <div className="text-6xl mb-4">🎵</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Our Love Song Playlist 💕
            </h1>
            <p className="text-lg opacity-90">
              Beautiful Hindi songs for our beautiful love story
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="space-y-3">
              {playlist.map((song, index) => (
                <div
                  key={song.id}
                  className={`bg-gradient-to-r ${song.color} rounded-xl p-4 md:p-5 transform transition-all duration-300 hover:scale-105 cursor-pointer`}
                  onClick={() => togglePlay(song.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transform transition-all duration-300">
                        {currentSong === song.id && isPlaying ? (
                          <Pause size={24} className="text-white" />
                        ) : (
                          <Play size={24} className="text-white ml-0.5" />
                        )}
                      </div>
                    </div>

                    <div className="flex-grow min-w-0">
                      <p className="text-white font-bold text-lg truncate">
                        {index + 1}. {song.title}
                      </p>
                      <p className="text-white/80 text-sm truncate">
                        {song.artist}
                      </p>
                    </div>

                    <div className="text-3xl flex-shrink-0">
                      {song.emoji}
                    </div>

                    {currentSong === song.id && isPlaying && (
                      <div className="flex gap-1 ml-2">
                        <div className="w-1 h-6 bg-white/70 animate-pulse rounded-sm" />
                        <div className="w-1 h-4 bg-white/70 animate-pulse rounded-sm" />
                        <div className="w-1 h-6 bg-white/70 animate-pulse rounded-sm" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {currentSong && (
              <div className="mt-8 p-6 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl text-center border-2 border-pink-300">
                <p className="text-lg font-bold text-gray-800">
                  🎶 Now Playing: {playlist.find(s => s.id === currentSong)?.title}
                </p>
                <p className="text-gray-600 mt-2">
                  By: {playlist.find(s => s.id === currentSong)?.artist}
                </p>
                <p className="text-pink-600 font-semibold mt-3">
                  ♥️ Every note reminds me of you ♥️
                </p>
              </div>
            )}

            {/* replaced the lower banner with a cute teddy at the top-right holding the banner */}
            <div className="playlist-teddy">
              <Teddy size={44} />
              <div className="teddy-banner">Click on any song to play ▶️</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => navigate('/slideshow')}
                className="px-8 py-3 bg-gray-200 text-gray-800 font-bold rounded-full hover:bg-gray-300 transform transition-all duration-300 hover:scale-105"
              >
                ← Back to Memories
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                ♥️ Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
