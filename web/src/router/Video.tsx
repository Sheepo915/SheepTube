import { useMemo } from "react";
import { useQuery } from "../hooks/useQuery";
import { Header } from "../layout/Header";
import { testContents } from "../test/data";
import { ContentContainer } from "../components/content/ContentContainer";
import { VideoPlayer } from "../components/videoPlayer/VideoPlayer";

export function Video() {
  const query = useQuery();

  const { videoUrl, thumbnailUrl } = useMemo(() => {
    const videoId: string = query.get("v") as string;

    const foundVideo = testContents.find(({ video }) => videoId === video.id);
    if (foundVideo) {
      return { videoUrl: foundVideo.video.videoUrl, thumbnailUrl: foundVideo.video.thumbnailUrl };
    } else {
      return { videoUrl: "", thumbnailUrl: "" };
    }
  }, [query]);

  return (
    <div className="lg:max-h-screen lg:h-screen | lg:overflow-hidden | flex flex-col | bg-neutral-800">
      <Header />
      <div className="grid lg:grid-cols-[75fr,25fr] lg:grid-rows-[1fr,1fr] flex-grow-1 gap-10 | h-full overflow-y-scroll | lg:pt-5 lg:px-3">
        <div className="lg:col-span-1 lg:row-span-1">
          <VideoPlayer src={videoUrl} poster={thumbnailUrl} />
        </div>
        <div className="lg:col-span-1 lg:row-span-1">
          <ContentContainer contentList={testContents} />
        </div>
      </div>
    </div>
  );
}
