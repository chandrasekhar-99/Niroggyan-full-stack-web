import { Request, Response } from 'express';
import { doctors } from '../data/doctors';

export const getAllDoctors = (req: Request, res: Response): void => {
  res.json(doctors);
};

