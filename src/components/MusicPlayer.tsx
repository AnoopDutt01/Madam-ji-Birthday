import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// Note: Add your music files to public/music folder
const playlist = [
  "/music/Achchi Lagti Ho.mp3",
  "/music/Fakira.mp3",
  "/music/Phir Mohabbat.mp3",
  "/music/Teri Meri Kahaani.mp3"  
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const hasAttemptedAutoplay = useRef(false);

  // Define handlers before they're used in useEffect
  const handleNext = useCallback(() => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, []);

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (audio.currentTime !== undefined && !isNaN(audio.currentTime)) {
        setCurrentTime(audio.currentTime);
      }
    };

    const updateDuration = () => {
      if (audio.duration !== undefined && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      const target = e.target as HTMLAudioElement;
      if (target.error) {
        console.error('Audio error details:', {
          code: target.error.code,
          message: target.error.message
        });
      }
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [handleNext]);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Autoplay on mount and page load/refresh
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || hasAttemptedAutoplay.current) return;

    const playAudio = async () => {
      try {
        // Use the first song for initial autoplay
        const initialSrc = playlist[0];
        audio.src = initialSrc;
        
        // Start muted to bypass autoplay restrictions (browsers allow muted autoplay)
        audio.muted = true;
        audio.volume = 0;
        audio.load();

        // Wait for audio to be ready
        if (audio.readyState < 2) {
          await new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error('Audio loading timeout'));
            }, 5000);

            const onCanPlay = () => {
              clearTimeout(timeout);
              audio.removeEventListener("canplay", onCanPlay);
              audio.removeEventListener("loadeddata", onCanPlay);
              audio.removeEventListener("error", onError);
              resolve();
            };

            const onError = () => {
              clearTimeout(timeout);
              audio.removeEventListener("canplay", onCanPlay);
              audio.removeEventListener("loadeddata", onCanPlay);
              audio.removeEventListener("error", onError);
              reject(new Error('Audio loading failed'));
            };

            audio.addEventListener("canplay", onCanPlay);
            audio.addEventListener("loadeddata", onCanPlay);
            audio.addEventListener("error", onError);
          });
        }

        // Try to play (muted)
        await audio.play();
        setIsPlaying(true);
        hasAttemptedAutoplay.current = true;
        
        // Unmute after a short delay
        setTimeout(() => {
          if (audio) {
            audio.muted = false;
            audio.volume = volume;
          }
        }, 500);
      } catch (error) {
        // If muted autoplay fails, try unmuted
        try {
          if (audio) {
            audio.muted = false;
            audio.volume = volume;
            await audio.play();
            setIsPlaying(true);
            hasAttemptedAutoplay.current = true;
          }
        } catch (unmutedError) {
          // Autoplay was prevented - user interaction required
          console.log('Autoplay prevented, user interaction required:', unmutedError);
          setIsPlaying(false);
          hasAttemptedAutoplay.current = true;
        }
      }
    };

    // Small delay to ensure audio element is ready
    const timer = setTimeout(playAudio, 500);
    return () => clearTimeout(timer);
  }, [volume]);

  // Enable audio on first user interaction (click/touch anywhere on page)
  useEffect(() => {
    const enableAudio = async () => {
      const audio = audioRef.current;
      if (!audio || isPlaying) return;

      try {
        // If audio is paused and we haven't played yet, try to play
        if (audio.paused && !hasAttemptedAutoplay.current) {
          audio.muted = false;
          audio.volume = volume;
          await audio.play();
          setIsPlaying(true);
          hasAttemptedAutoplay.current = true;
        }
      } catch (error) {
        console.log('Could not enable audio:', error);
      }
    };

    // Listen for any user interaction
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, enableAudio, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, enableAudio);
      });
    };
  }, [isPlaying, volume]);

  // Handle song changes - reload audio when song index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const currentSrc = playlist[currentSongIndex];
    
    // Always reload when song index changes to ensure clean state
    audio.src = currentSrc;
    audio.load();
    setCurrentTime(0);
    
    // Always try to play when switching songs (default behavior)
    const playWhenReady = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Error playing new song:', error);
          setIsPlaying(false);
        });
    };
    
    // Try both canplay and loadeddata events for better compatibility
    audio.addEventListener("canplay", playWhenReady, { once: true });
    audio.addEventListener("loadeddata", playWhenReady, { once: true });
    
    // Fallback: if audio is already ready, play immediately
    if (audio.readyState >= 3) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Error playing new song:', error);
          setIsPlaying(false);
        });
    }
    
    // Cleanup function
    return () => {
      audio.removeEventListener("canplay", playWhenReady);
      audio.removeEventListener("loadeddata", playWhenReady);
    };
  }, [currentSongIndex]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      // Check actual audio state, not just React state
      if (audio.paused) {
        // Ensure audio source is set
        if (!audio.src || audio.src === window.location.href) {
          audio.src = playlist[currentSongIndex];
          audio.load();
        }
        
        // Wait for audio to be ready if needed
        if (audio.readyState < 2) {
          await new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error('Audio loading timeout'));
            }, 5000);
            
            const onCanPlay = () => {
              clearTimeout(timeout);
              audio.removeEventListener("canplay", onCanPlay);
              audio.removeEventListener("error", onError);
              resolve();
            };
            
            const onError = () => {
              clearTimeout(timeout);
              audio.removeEventListener("canplay", onCanPlay);
              audio.removeEventListener("error", onError);
              reject(new Error('Audio loading failed'));
            };
            
            audio.addEventListener("canplay", onCanPlay);
            audio.addEventListener("error", onError);
          });
        }
        
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Get current song name from file path
  const getCurrentSongName = () => {
    const currentSrc = playlist[currentSongIndex];
    const fileName = currentSrc.split('/').pop() || '';
    // Remove .mp3 extension and return the name
    return fileName.replace(/\.mp3$/i, '');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-border shadow-lg z-50 px-2 sm:px-4 py-2 sm:py-3">
      <audio 
        ref={audioRef} 
        src={playlist[currentSongIndex]}
        preload="auto"
        autoPlay
        onError={(e) => {
          console.error('Audio loading error:', e);
          const target = e.target as HTMLAudioElement;
          if (target.error) {
            console.error('Audio error details:', {
              code: target.error.code,
              message: target.error.message
            });
          }
        }}
        onLoadedMetadata={() => {
          console.log('Audio metadata loaded successfully');
          if (audioRef.current && audioRef.current.duration) {
            setDuration(audioRef.current.duration);
          }
        }}
        onCanPlay={() => {
          console.log('Audio can play');
        }}
      />
      
      <div className="max-w-4xl mx-auto">
        {/* Song Name Display */}
        <div className="mb-2 text-center">
          <p className="text-sm sm:text-base font-medium text-foreground truncate px-2">
            {getCurrentSongName()}
          </p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="hover:bg-primary/10 h-8 w-8 sm:h-10 sm:w-10"
            >
              <SkipBack className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="hover:bg-primary/10 h-8 w-8 sm:h-10 sm:w-10"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              ) : (
                <Play className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="hover:bg-primary/10 h-8 w-8 sm:h-10 sm:w-10"
            >
              <SkipForward className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </Button>
          </div>

          <div className="flex-1 flex items-center gap-1 sm:gap-3">
          <span className="text-xs sm:text-sm text-muted-foreground min-w-[35px] sm:min-w-[40px]">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={(value) => {
                const newTime = value[0];
                setCurrentTime(newTime);
                if (audioRef.current) {
                  audioRef.current.currentTime = newTime;
                }
              }}
              className="cursor-pointer"
            />
          </div>
          <span className="text-xs sm:text-sm text-muted-foreground min-w-[35px] sm:min-w-[40px]">
            {formatTime(duration)}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 min-w-[120px]">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={(value) => {
              const newVolume = value[0] / 100;
              setVolume(newVolume);
              if (audioRef.current) {
                audioRef.current.volume = newVolume;
              }
            }}
            className="w-20 cursor-pointer"
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
