import IQuestionOption from './IQuestionOption';

export default interface IQuestion {
  answer?: string;
  isRequired: boolean;
  options: IQuestionOption[];
  title: string;
  type: string;
}
