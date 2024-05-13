import { Channel } from "./user.types";

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export interface Metadata {
  views: number;
  videoLength: number;
  uploadTime: Date;
}

export interface Content {
  channel: Channel;
  video: Video;
  metadata: Metadata;
}

export interface Category {
  title: string;
  description?: string;
}
