import ReactPlayer from "react-player/lazy";

interface VideoPlayerProps {
  src: string;
  poster: string;
  autoPlay?: boolean;
}

export function VideoPlayer({ src, poster, autoPlay = false }: VideoPlayerProps) {
  return (
    <div className="relative w-full aspect-video">
      <div className="relative pt-[56.27%]">
        <ReactPlayer
          url={src}
          playing={autoPlay}
          config={{ file: { attributes: { poster } } }}
          fallback={<img src={poster} />}
          controls
          width="100%"
          height="100%"
          className="absolute top-0 left-0"
        />
      </div>
    </div>
  );
}
