import React, { useState, useEffect } from 'react';

const destinationsData = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    description: 'The City of Light awaits you',
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'
  },
  {
    id: 2,
    name: 'Tokyo',
    country: 'Japan',
    description: 'Experience the blend of tradition and future',
    attractions: ['Shibuya', 'Tokyo Tower', 'Senso-ji Temple'],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'
  },
  {
    id: 3,
    name: 'New York',
    country: 'USA',
    description: 'The city that never sleeps',
    attractions: ['Times Square', 'Central Park', 'Statue of Liberty'],
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'
  }
];

const Home = () => {
  const [featuredDestinations, setFeaturedDestinations] = useState([]);

  useEffect(() => {
    setFeaturedDestinations(destinationsData.slice(0, 3));
  }, []);

  return (
    <div className="home">
      <h2>Plan Your Next Adventure</h2>
      <p>Welcome to Travel Planner! Start planning your dream vacation today.</p>
      <div className="featured-destinations">
        <h3>Featured Destinations</h3>
        <div className="destination-grid">
          {featuredDestinations.map(destination => (
            <div key={destination.id} className="destination-card">
              <img src={destination.image} alt={destination.name} />
              <h4>{destination.name}</h4>
              <p>{destination.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;