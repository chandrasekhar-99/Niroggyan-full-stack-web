import { Request, Response } from 'express';
import { doctors } from '../data/doctors';

export const getAllDoctors = (req: Request, res: Response): void => {
  res.json(doctors);
};

export const getDoctorById = (req: Request, res: Response) => {
  const doctor = doctors.find((d) => d.id === req.params.id);

  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  res.json(doctor);
};