import React, { useState, useEffect } from 'react';

const MyTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Load saved trips from localStorage
    const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    setTrips(savedTrips);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="my-trips">
      <h2>My Planned Trips</h2>
      {trips.length === 0 ? (
        <p>No trips planned yet. Start planning your next adventure!</p>
      ) : (
        <div className="trips-grid">
          {trips.map(trip => (
            <div key={trip.id} className="trip-card">
              <h3>{trip.destination}</h3>
              <div className="trip-details">
                <p><strong>Duration:</strong> {calculateDuration(trip.startDate, trip.endDate)} days</p>
                <p><strong>Dates:</strong> {formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
                <p><strong>Travelers:</strong> {trip.travelers}</p>
                <p><strong>Budget:</strong> ${trip.budget}</p>
                <div className="trip-activities">
                  <strong>Planned Activities:</strong>
                  <ul>
                    {trip.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;