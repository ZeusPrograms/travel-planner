import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const destinationsData = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    description: 'Experience the magic of the City of Light with its iconic landmarks, world-class cuisine, and romantic atmosphere.',
    longDescription: 'Paris, the capital of France, is renowned for its art, fashion, gastronomy, and culture. From the iconic Eiffel Tower to the historic Louvre Museum, every corner of Paris tells a story of history and romance.',
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Champs-Élysées', 'Montmartre'],
    bestTimeToVisit: 'April to October',
    averageBudget: '$150-200 per day',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
      'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b'
    ]
  },
  {
    id: 2,
    name: 'Tokyo',
    country: 'Japan',
    description: 'Discover the perfect blend of traditional culture and cutting-edge technology in Japan\'s dynamic capital.',
    longDescription: 'Tokyo is a city where ultra-modern living meets ancient traditions. Experience the world\'s most efficient public transport, incredible food culture, and beautiful temples alongside futuristic technology.',
    attractions: ['Shibuya Crossing', 'Tokyo Tower', 'Senso-ji Temple', 'Akihabara', 'Meiji Shrine'],
    bestTimeToVisit: 'March to May or September to November',
    averageBudget: '$120-180 per day',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
      'https://images.unsplash.com/photo-1557409518-691ebcd96038'
    ]
  },
  {
    id: 3,
    name: 'New York',
    country: 'USA',
    description: 'Immerse yourself in the energy of the city that never sleeps, where culture, art, and diversity thrive.',
    longDescription: 'New York City is a global hub of culture, arts, fashion, and finance. From Broadway shows to world-class museums, Central Park to Times Square, NYC offers endless opportunities for exploration and entertainment.',
    attractions: ['Times Square', 'Central Park', 'Statue of Liberty', 'Empire State Building', 'Broadway'],
    bestTimeToVisit: 'April to June or September to November',
    averageBudget: '$200-250 per day',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    images: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
      'https://images.unsplash.com/photo-1522083165195-3424ed129620',
      'https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc'
    ]
  }
];

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setDestinations(destinationsData);
  }, []);

  const handlePlanTrip = (destination) => {
    navigate('/plan', { state: { selectedDestination: destination } });
  };

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedDestination.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedDestination.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="destinations-container">
      <h2>Explore Destinations</h2>
      <div className="destinations-grid">
        {destinations.map(destination => (
          <div 
            key={destination.id} 
            className="destination-card"
            onClick={() => handleDestinationClick(destination)}
          >
            <div className="destination-image">
              <img src={destination.image} alt={destination.name} />
            </div>
            <div className="destination-content">
              <h3>{destination.name}, {destination.country}</h3>
              <p>{destination.description}</p>
              <div className="destination-highlights">
                <span>Best Time: {destination.bestTimeToVisit}</span>
                <span>Budget: {destination.averageBudget}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDestination && (
        <div className="destination-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setSelectedDestination(null)}>×</button>
            <div className="image-slider">
              <button className="slider-button prev" onClick={handlePrevImage}>‹</button>
              <img 
                src={selectedDestination.images[currentImageIndex]} 
                alt={selectedDestination.name} 
              />
              <button className="slider-button next" onClick={handleNextImage}>›</button>
            </div>
            <div className="modal-details">
              <h2>{selectedDestination.name}, {selectedDestination.country}</h2>
              <p className="long-description">{selectedDestination.longDescription}</p>
              <div className="attractions-section">
                <h3>Top Attractions</h3>
                <div className="attractions-grid">
                  {selectedDestination.attractions.map((attraction, index) => (
                    <div key={index} className="attraction-item">
                      {attraction}
                    </div>
                  ))}
                </div>
              </div>
              <div className="travel-info">
                <div className="info-item">
                  <h4>Best Time to Visit</h4>
                  <p>{selectedDestination.bestTimeToVisit}</p>
                </div>
                <div className="info-item">
                  <h4>Average Daily Budget</h4>
                  <p>{selectedDestination.averageBudget}</p>
                </div>
              </div>
              <button 
                className="plan-trip-button"
                onClick={() => handlePlanTrip(selectedDestination)}
              >
                Plan Your Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;