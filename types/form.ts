export interface FormQuestion {
  id: string;
  question: string;
  type: string;
  required: boolean;
  options: Array<{
    id: number;
    value: string;
  }>;
}

export interface Form {
  id: string;
  title: string;
  description: string;
  targetStakeholder: string;
  questions: FormQuestion[];
}