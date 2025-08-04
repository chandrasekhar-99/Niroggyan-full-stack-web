import React from 'react';
import { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import styles from './DoctorsList.module.css';

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




const DoctorsList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
   const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/doctors`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Doctor[] = await response.json();
        console.log('Fetched doctors:', data);
        setDoctors(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = doctors.filter(
      doctor =>
        doctor.name.toLowerCase().includes(lowercasedTerm) ||
        doctor.specialization.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  // const getAvailabilityStatus = (doctor: Doctor) => {
  //   if (!doctor.available) return 'On Leave';
    
  //   const today = new Date().toISOString().split('T')[0];
  //   const hasAvailableToday = doctor.availableSlots.some(slot => 
  //     slot.startsWith(today)
  //   );
    
  //   return hasAvailableToday ? 'Available Today' : 'Fully Booked';
  // };

  const getAvailabilityStatus = (doctor: Doctor) => {
  if (!doctor.available) return 'On Leave';

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth(); // 0-indexed (0 = January)

  const hasUpcomingSlot = doctor.availableSlots.some(slot => {
    const slotDate = new Date(slot);
    return (
      slotDate.getFullYear() >= todayYear &&
      slotDate.getMonth() >= todayMonth
    );
  });

  return hasUpcomingSlot ? 'Available Today' : 'Fully Booked';
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available Today': return styles.statusGreen;
      case 'Fully Booked': return styles.statusYellow;
      case 'On Leave': return styles.statusRed;
      default: return styles.statusGray;
    }
  };

  const handleDoctorClick = (id: string) => {
    navigate(`/doctor/${id}`);
  };

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h2>Niroggyan Doctors Listing</h2>
      <div>
        <input
          type="text"
          placeholder="Search by name or specialization..."
          className={styles.searchBar}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className={styles.list}>
        {paginatedDoctors.map((doc) => {
          const status = getAvailabilityStatus(doc);
          const statusClass = getAvailabilityColor(status);

          return (
            <li key={doc.id} className={styles.item}  
            onClick={() => handleDoctorClick(doc.id)}>
              <div className={styles.initialsAvatar} style={{ backgroundColor: getColorFromName(doc.name) }}>
                {getInitials(doc.name)}
              </div>
              <div className={styles.info}>
                <p className={styles.name}>{doc.name}</p>
                <p className={styles.specialization}>{doc.specialization}</p>
                <p className={styles.description}>{doc.description}</p>
                <p className={`${styles.status} ${statusClass}`}>{status}</p>
              </div>
            </li>
          );
        })}
      </ul>
       <div className={styles.pagination}>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DoctorsList;
