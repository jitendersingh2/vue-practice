type EventRange = 'single-day' | 'date-range';

export default interface IEventDuration {
  eventRange: EventRange;
  startDate: string;
  startTime: {
    dateTime: string;
    timezone: string;
  };
  endDate: string;
  endTime: {
    dateTime: string;
    timezone: string;
  };
}
