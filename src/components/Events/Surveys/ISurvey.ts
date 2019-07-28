import IQuestion from './IQuestion';
import ITicket from '@/components/Events/Tickets/ITicket';

export default interface ISurvey {
  id?: number;
  name: string;
  questions: IQuestion[];
  ticket?: ITicket;
}
