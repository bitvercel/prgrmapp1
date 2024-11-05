export interface Field {
  name: string;
  type: string;
  required: boolean;
}

export interface StakeholderRole {
  name: string;
  fields: Field[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
}

export interface Stakeholder {
  id: string;
  role: string;
  data: {
    [key: string]: string;
  };
}