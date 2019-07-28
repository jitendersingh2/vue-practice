import IQuestion from './IQuestion';
import ITicket from '@/components/Events/Tickets/ITicket';

export default interface ISurveyData {
  id: string;
  name: string;
  questionCount: number;
  ticket?: object;
}
