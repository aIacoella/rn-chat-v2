export enum ChatType {
  SINGLE = 'SINGLE',
  GROUP = 'GROUP',
}
export enum AttachmentType {
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
}

export interface UserMessage {
  id: string;
  timestamp: Date;
  text: string;
  user: GenericUser;
  attachment?: GenericAttachment;
}

export interface GenericMessage {
  id: string;
  timestamp: Date | string;
  text: string;
  user?: GenericUser;
  system?: boolean;
  attachment?: GenericAttachment;
}

export interface GenericUser {
  id: string;
  username?: string;
}

export interface GenericChat {
  id: string;
  type: ChatType;
  users: GenericUser[];
  messages: GenericMessage[];
}

export interface BubbleProps {
  item: UserMessage;
  showDate: boolean;
  continuation: boolean;
  userMade: boolean;
  audioPlayer?: AudioPlayer;
}

export interface ImageAttachment {
  type: typeof AttachmentType.IMAGE;
  url: string;
}

export interface AudioAttachment {
  type: typeof AttachmentType.AUDIO;
  id: string;
  url: string;
}

export interface BasicAudio {
  id: string;
  url: string;
  isPaused: boolean;
}

export interface VideoAttachment {
  type: typeof AttachmentType.VIDEO;
  url: string;
}

export type GenericAttachment =
  | ImageAttachment
  | AudioAttachment
  | VideoAttachment;

export interface AudioPlayer {
  playAudio: (audio: AudioAttachment) => void;
  pauseAudio: () => void;
  focusedAudio?: BasicAudio;
  time: number;
}
