import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './AppointmentPage.module.css';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  profileImg: string;
  available: boolean;
  availableSlots: string[];
  description: string;
}

const AppointmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  
    if (!patientName.trim()) {
      alert('Please enter Patient Name');
      return;
    }
    if (!email.includes('@')) {
      alert('Please enter a valid Email');
      return;
    }
    if (!appointmentDate) {
      alert('Please select Date and Time');
      return;
    }

   

    setSubmitted(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!doctor) return <p>Doctor not found</p>;

  return (
    <div className={styles.container}>
      {submitted ? (
        <div className={styles.confirmation}>
          <h2>Appointment Booked Successfully!</h2>
          <p>Thank you, {patientName}. Your appointment with {doctor.name} is confirmed.</p>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      ) : (
        <>
          <h2>Book Appointment with {doctor.name}</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              Patient Name:
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Appointment Date & Time:
              <input
                type="datetime-local"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </label>

            <button type="submit">Confirm Appointment</button>
          </form>
        </>
      )}
    </div>
  );
};

export default AppointmentPage;
