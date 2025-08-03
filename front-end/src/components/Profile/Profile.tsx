import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  profileImg: string;
  available: boolean;
  availableSlots: string[];
  description: string;
}

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/doctors/${id}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: Doctor = await res.json();
        setDoctor(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) return <p>Loading doctor details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!doctor) return <p>Doctor not found</p>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.header}>
        <img src={doctor.profileImg} alt={doctor.name} className={styles.profileImg} />
        <div className={styles.info}>
          <h2 className={styles.name}>{doctor.name}</h2>
          <p className={styles.specialization}>{doctor.specialization}</p>
          <p className={styles.description}>{doctor.description}</p>
          <p className={styles.availability}>
            Availability: {doctor.available ? 'Available' : 'On Leave'}
          </p>
          <p>Available Slots:</p>
          {doctor.availableSlots.length > 0 ? (
            <ul className={styles.slotsList}>
              {doctor.availableSlots.map((slot, idx) => (
                <li key={idx}>{new Date(slot).toLocaleString()}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.noSlots}>No available slots</p>
          )}
        </div>
      </div>
      <button
        className={styles.bookButton}
        onClick={() => navigate(`/appointment/${id}`)}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default Profile;
