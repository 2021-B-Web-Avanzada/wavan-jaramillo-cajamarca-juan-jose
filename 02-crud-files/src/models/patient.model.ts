export interface Patient {
  id?: number;
  name: string;
  lastName: string;
  age: number;
  identityNumber: string;
  birthDate: string;
  hospitalId: number;
  created_at?: string;
  updated_at?: string;
}
