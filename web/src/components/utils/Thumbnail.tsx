import { forwardRef } from "react";

interface ThumbnailProps {
  thumbnailSrc: string;
  isThumbnailPlaying: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const Thumbnail = forwardRef<HTMLVideoElement, ThumbnailProps>(
  ({ thumbnailSrc, isThumbnailPlaying, onMouseEnter, onMouseLeave }, ref) => {
    return (
      <a
        target="none"
        className="relative aspect-video w-full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onMouseEnter}
        onTouchEnd={onMouseLeave}
      >
        <img
          src={thumbnailSrc}
          className={`block w-full h-full object-contain transition-[border-radius] duration-200 bg-black/70 ${
            isThumbnailPlaying ? "rounded-none" : "rounded-xl"
          }`}
          draggable={false}
        />
        <video
          ref={ref}
          className={`block w-full h-full object-contain absolute inset-0 transition-opacity duration-1000 bg-black/70 ${
            isThumbnailPlaying ? "opacity-100 delay-200" : "opacity-0"
          }`}
          muted
          playsInline
          draggable={false}
        />
      </a>
    );
  }
);
