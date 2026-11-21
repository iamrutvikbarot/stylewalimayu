'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ShoppingBag,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react';

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  directUrl?: string; // Direct 4K / 1080p stream URL for native <video> tag
  embedUrl?: string; // Fallback iframe embed URL
}

interface MediaCarouselProps {
  media: MediaItem[];
  title: string;
  code: string;
  store: string;
  aspectRatio?: string; // e.g. "aspect-video" (16:9 YouTube full video ratio)
  onSlideClick?: (index: number) => void;
  className?: string;
  initialSlide?: number;
  autoPlayInterval?: number; // default 3200ms
  isModal?: boolean; // If in modal, bigger touch targets & unmuted by default
  initialMuted?: boolean;
}

export function MediaCarousel({
  media,
  title,
  code,
  store,
  aspectRatio = 'aspect-video',
  onSlideClick,
  className = '',
  initialSlide = 0,
  autoPlayInterval = 3200,
  isModal = false,
  initialMuted,
}: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const [isHovered, setIsHovered] = useState(false);
  // Default to unmuted in modal (since modal opens on explicit user click), or muted on initial feed card
  const [isMuted, setIsMuted] = useState(
    initialMuted !== undefined ? initialMuted : (isModal ? false : true)
  );
  const touchStartXRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const total = media.length;
  const imageCount = media.filter((m) => m.type === 'image').length;
  const videoIndex = media.findIndex((m) => m.type === 'video');
  const hasVideo = videoIndex !== -1;

  // Sync actual HTMLMediaElement.muted property with state (crucial for React DOM)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Auto-advance through images ONLY:
  // Once the last image is done, loop back to the first image.
  useEffect(() => {
    // Only auto-play if there are at least 2 images and user is NOT hovering
    if (imageCount <= 1 || isHovered) return;

    // If currently on a video, DO NOT auto-advance (let user watch the video!)
    if (media[currentIndex]?.type === 'video') return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        // If on an image, advance to next image, or loop back to 0
        if (prev < imageCount - 1) {
          return prev + 1;
        }
        return 0; // Loop back from last image to first image
      });
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [imageCount, isHovered, currentIndex, media, autoPlayInterval]);

  // Attempt video playback when video slide is active
  useEffect(() => {
    if (media[currentIndex]?.type === 'video' && videoRef.current) {
      const v = videoRef.current;
      v.muted = isMuted;
      v.currentTime = 0;
      v.play().catch(() => {
        // If unmuted autoplay fails due to strict browser policy, fallback to muted playback
        if (!v.muted) {
          v.muted = true;
          setIsMuted(true);
          v.play().catch(() => {});
        }
      });
    }
  }, [currentIndex, media, isMuted]);

  const unmuteAndPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMuted(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
    }
  };

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const goToNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % total);
    },
    [total]
  );

  const goToPrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + total) % total);
    },
    [total]
  );

  const goToIndex = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex(idx);
  };

  // When clicking on the video slide
  const handleVideoContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      // First click unmutes audio immediately!
      unmuteAndPlay(e);
    } else {
      // If already playing audio on the card, open the Quick View modal
      if (onSlideClick) {
        onSlideClick(currentIndex);
      }
    }
  };

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    touchStartXRef.current = null;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  if (total === 0) {
    return (
      <div
        className={`relative w-full ${aspectRatio} bg-gradient-to-br from-[#FFF7ED] via-[#FAFAF8] to-[#FEF2F2] flex flex-col items-center justify-center p-4 text-center ${className}`}
        onClick={() => onSlideClick && onSlideClick(0)}
      >
        <div className="w-12 h-12 rounded-2xl bg-[#E07A5F]/10 text-[#E07A5F] flex items-center justify-center mb-2 shadow-sm">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <span className="text-xs font-black text-[#E07A5F] bg-[#E07A5F]/10 px-2 py-0.5 rounded-md mb-1">
          Code: {code}
        </span>
        <p className="text-xs font-bold text-[#1F2937] line-clamp-2 px-2">{title}</p>
        <span className="text-[10px] text-[#6B7280] mt-1 font-semibold uppercase">{store}</span>
      </div>
    );
  }

  const currentItem = media[currentIndex] || media[0];
  const isCurrentVideo = currentItem.type === 'video';

  return (
    <div
      className={`relative w-full ${aspectRatio} bg-[#0F172A] overflow-hidden select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Content */}
      {isCurrentVideo ? (
        /* Video Slide: High-Definition native streaming player in 16:9 YouTube Full Video Ratio */
        <div
          className="relative w-full h-full bg-[#0F172A] flex items-center justify-center overflow-hidden cursor-pointer group/video"
          onClick={handleVideoContainerClick}
        >
          {/* Ambient blurred backdrop for video poster */}
          {media.find((m) => m.type === 'image')?.url && (
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-25 scale-125 pointer-events-none"
              style={{
                backgroundImage: `url(${media.find((m) => m.type === 'image')?.url})`,
              }}
            />
          )}

          {currentItem.directUrl ? (
            <video
              ref={videoRef}
              key={currentItem.directUrl}
              src={currentItem.directUrl}
              poster={media.find((m) => m.type === 'image')?.url}
              className="relative z-10 w-full h-full object-contain object-center"
              playsInline
              autoPlay
              loop
              muted={isMuted}
              controls={isModal}
              preload="auto"
            />
          ) : (
            <iframe
              src={`${currentItem.embedUrl || currentItem.url}${
                (currentItem.embedUrl || currentItem.url).includes('?') ? '&' : '?'
              }autoplay=1`}
              className="relative z-10 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={`Video Reel for ${title}`}
            />
          )}

          {/* High-Quality Reel Badge */}
          <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white text-[10px] font-black shadow-md border border-white/10">
            <Sparkles className="w-2.5 h-2.5 text-[#F59E0B]" />
            <span>HD 4K Reel</span>
          </div>

          {/* Audio Status & Sound Control Button */}
          {currentItem.directUrl && (
            <button
              type="button"
              onClick={toggleSound}
              className={`absolute bottom-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-lg transition-all active:scale-95 ${
                isMuted
                  ? 'bg-[#E07A5F] hover:bg-[#D0694E] text-white animate-pulse'
                  : 'bg-black/75 hover:bg-black text-white'
              }`}
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              title={isMuted ? 'Click to unmute sound' : 'Click to mute sound'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Tap for Sound</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Audio On</span>
                </>
              )}
            </button>
          )}
        </div>
      ) : (
        /* Image Slide: Centered uncropped in 16:9 YouTube ratio with ambient blurred backdrop */
        <div
          className="relative w-full h-full cursor-pointer bg-[#0F172A] flex items-center justify-center overflow-hidden"
          onClick={() => onSlideClick && onSlideClick(currentIndex)}
        >
          {/* Ambient blurred backdrop so the 16:9 widescreen frame is filled gracefully */}
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-30 scale-125"
            style={{ backgroundImage: `url(${currentItem.url})` }}
          />

          {/* Crisp, uncropped centered fashion photo in 16:9 widescreen frame */}
          <Image
            src={currentItem.url}
            alt={`${title} - view ${currentIndex + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="relative z-10 object-contain object-center drop-shadow-lg transition-all duration-500 ease-out"
            priority={currentIndex === 0}
            unoptimized
          />
        </div>
      )}

      {/* Prev / Next Arrow Controls */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-[#1F2937] flex items-center justify-center shadow-md backdrop-blur-sm transition-all hover:scale-110 active:scale-90"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-[#1F2937] flex items-center justify-center shadow-md backdrop-blur-sm transition-all hover:scale-110 active:scale-90"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Bottom Pagination Bar: Image Dots + Dedicated Video Pill */}
      {total > 1 && (
        <div
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md pointer-events-auto shadow-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {media.map((item, idx) => {
            const isActive = idx === currentIndex;
            if (item.type === 'video') {
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    goToIndex(idx, e);
                    unmuteAndPlay(e);
                  }}
                  className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-[#E07A5F] text-white shadow-sm'
                      : 'bg-white/20 text-white/90 hover:bg-white/40'
                  }`}
                  title="Play Video Reel with Audio"
                >
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>Reel</span>
                </button>
              );
            }
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => goToIndex(idx, e)}
                className={`transition-all rounded-full ${
                  isActive
                    ? 'w-4 h-1.5 bg-[#E07A5F]'
                    : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                }`}
                aria-label={`Go to image ${idx + 1}`}
                title={`Image ${idx + 1}`}
              />
            );
          })}
        </div>
      )}

      {/* Quick Jump Video Badge (Top-Right if not currently on video) */}
      {hasVideo && !isCurrentVideo && !isModal && (
        <button
          type="button"
          onClick={(e) => {
            goToIndex(videoIndex, e);
            unmuteAndPlay(e);
          }}
          className="absolute top-2.5 right-2.5 z-20 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 hover:bg-black text-white text-[10px] font-black backdrop-blur-md shadow-sm transition-transform hover:scale-105 active:scale-95 border border-white/10"
          title="Watch Video Reel with Audio"
        >
          <Play className="w-2.5 h-2.5 fill-white text-white" />
          <span>Watch Reel</span>
        </button>
      )}
    </div>
  );
}
