import { Patient } from './patient.model';

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  image: string;
  patients: Patient[];
  createdAt?: string;
  updatedAt?: string;
}
