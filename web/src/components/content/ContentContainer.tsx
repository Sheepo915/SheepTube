import { Content } from "../../types/content.types";
import { ContentCard } from "./ContentCard";

export interface ContentContainerProps {
  contentList: Content[];
}

export function ContentContainer({ contentList }: ContentContainerProps) {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {contentList.map((content: Content) => (
        <ContentCard content={content} key={content.video.id} />
      ))}
    </div>
  );
}
