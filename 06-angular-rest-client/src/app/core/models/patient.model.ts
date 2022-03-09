export interface Patient {
  id: string;
  name: string;
  age: number;
  identityNumber: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  image: string;
  hospitalId: string;
  createdAt?: string;
  updatedAt?: string;
}
