import { useEffect, useState } from "react";
import React from "react";
import { Doctor } from "../../types/index"

const DoctorsList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      const fetchDoctors = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/doctors");
          const data : Doctor[] = await response.json();
          setDoctors(data);
        } catch (error) {
          setError("Failed to fetch doctors");
        } finally {
          setLoading(false);
        }
      };
      fetchDoctors();
  }, []);

  if (loading) {
    return <div>Loading Doctors...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Doctors List</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            <h3>{doctor.name}</h3>
            <p>Specialization: {doctor.specialization}</p>
            <p>{doctor.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsList;
