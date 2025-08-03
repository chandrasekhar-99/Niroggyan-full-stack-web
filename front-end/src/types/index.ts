export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  profileImg: string;
  available: boolean;
  availableSlots: string[];
  description: string;
}