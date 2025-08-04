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

const COLORS = ['#3498db', '#e67e22', '#2ecc71', '#9b59b6', '#1abc9c', '#e74c3c', '#f39c12', '#34495e'];

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

  const getInitials = (name: string) => {
    const nameParts = name.replace(/^Dr\.\s*/i, '').split(' ');
    const initials = nameParts.map(part => part[0]).join('').toUpperCase();
    return initials.slice(0, 2);
  };

  const getColorFromName = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
  };

  if (loading) return <p>Loading doctor details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!doctor) return <p>Doctor not found</p>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.header}>
        <div className={styles.initialsAvatar} style={{ backgroundColor: getColorFromName(doctor.name) }}>
          {getInitials(doctor.name)}
        </div>
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
