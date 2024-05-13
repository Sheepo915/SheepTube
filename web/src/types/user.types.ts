export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Creator extends User {
  channels: Channel[];
}

export interface Channel {
  id: string;
  channelName: string;
  channelDescription: string;
  channelProfilePic: string;
  channelBannerPic: string;
  isVerified: boolean;
  createdDate: Date;
}
