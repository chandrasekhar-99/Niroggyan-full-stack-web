import { doctors } from '../data/doctors';
export const getAllDoctors = (req, res) => {
    res.json(doctors);
};
