type EventPoster = 'IMAGE' | 'VIDEO_EMBED' | 'HIDDEN';

export default interface IEventPoster {
  type: EventPoster;
  data: string;
}
