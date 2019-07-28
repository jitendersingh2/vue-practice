import ISurvey from '@/components/Events/Surveys/ISurvey';

type TicketStatus = 'OPEN' | 'HIDDEN' | 'CLOSE';

export default interface ITicket {
  id: number;
  name: string;
  quantity: string | number;
  startSelling: string;
  stopSelling: string;
  promoCode: string;
  status: TicketStatus;
  survey?: ISurvey;
  [key: string]: any;
}
