import { useEffect, useRef, useState } from "react";
import { Content } from "../../types/content.types";
import { ProfilePic } from "../utils/ProfilePic";
import { Thumbnail } from "../utils/Thumbnail";
import { ContentMetadata } from "./ContentMetadata";
import { Link } from "react-router-dom";

interface ContentCardProps {
  content: Content;
}

export function ContentCard({ content }: ContentCardProps) {
  const [isThumbnailPlaying, setThumbnailPlaying] = useState<boolean>(false);
  const thumbnailRef = useRef<HTMLVideoElement>(null);

  function handleThumbnailPlayer(isPlaying: boolean) {
    const delay = setTimeout(() => {}, 1500);

    return () => {
      clearTimeout(delay);
      setThumbnailPlaying(isPlaying);
    };
  }

  useEffect(() => {
    if (thumbnailRef.current == null) return;

    if (isThumbnailPlaying) {
      thumbnailRef.current.src = content.video.videoUrl;

      thumbnailRef.current.currentTime = 0;
      thumbnailRef.current.play();
    } else {
      thumbnailRef.current.pause();
    }
  }, [isThumbnailPlaying, content]);

  return (
    <Link to={`/watch?v=${content.video.id}`} className="flex flex-col gap-2 | dark:text-white">
      <Thumbnail
        ref={thumbnailRef}
        thumbnailSrc={content.video.thumbnailUrl}
        // videoSrc={content.video.videoUrl}
        isThumbnailPlaying={isThumbnailPlaying}
        onMouseEnter={handleThumbnailPlayer(true)}
        onMouseLeave={handleThumbnailPlayer(false)}
      />
      <div className="flex h-24 w-full | space-x-3">
        <div className="basis-1">
          <ProfilePic img={content.channel.channelProfilePic} size={10} />
        </div>
        <ContentMetadata
          title={content.video.title}
          creatorName={content.channel.channelName}
          views={content.metadata.views}
          uploadTime={content.metadata.uploadTime}
          isVerified={content.channel.isVerified}
        />
      </div>
    </Link>
  );
}
