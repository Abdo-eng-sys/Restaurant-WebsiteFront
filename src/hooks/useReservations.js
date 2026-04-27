import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/reservations');
      setReservations(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createReservation = async (data) => {
    const response = await api.post('/api/reservations', data);
    setReservations(prev => [...prev, response.data]);
    return response.data;
  };

  const cancelReservation = async (id) => {
    await api.delete(`/api/reservations/${id}`);
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  return { reservations, loading, error, createReservation, cancelReservation, refetch: fetchReservations };
};
