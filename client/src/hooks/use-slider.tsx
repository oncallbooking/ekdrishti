import { useState, useEffect, useRef, useCallback } from "react";

interface UseSliderProps {
  totalSlides: number;
  autoPlayDelay?: number;
  infinite?: boolean;
}

export function useSlider({ totalSlides, autoPlayDelay = 3000, infinite = true }: UseSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => {
      if (infinite) {
        return (prev + 1) % totalSlides;
      }
      return prev < totalSlides - 1 ? prev + 1 : prev;
    });
  }, [totalSlides, infinite]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => {
      if (infinite) {
        return (prev - 1 + totalSlides) % totalSlides;
      }
      return prev > 0 ? prev - 1 : prev;
    });
  }, [totalSlides, infinite]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
  }, [totalSlides]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      if (isAutoPlaying) {
        nextSlide();
      }
    }, autoPlayDelay);
  }, [isAutoPlaying, nextSlide, autoPlayDelay]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const resumeAutoPlay = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  // Touch/swipe handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    return touch.clientX;
  }, []);

  const handleTouchEnd = useCallback((startX: number, e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const diff = startX - touch.clientX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    handleTouchStart,
    handleTouchEnd,
  };
}
