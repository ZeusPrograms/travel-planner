import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import MyTrips from './components/MyTrips';

// Destinations data
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

// Home Component
// const Home = () => {
//   const [featuredDestinations, setFeaturedDestinations] = useState([]);

//   useEffect(() => {
//     // Simulate fetching featured destinations
//     setFeaturedDestinations(destinationsData.slice(0, 3));
//   }, []);

//   return (
//     <div className="home">
//       <h2>Plan Your Next Adventure</h2>
//       <p>Welcome to Travel Planner! Start planning your dream vacation today.</p>
//       <div className="featured-destinations">
//         <h3>Featured Destinations</h3>
//         <div className="destination-grid">
//           {featuredDestinations.map(destination => (
//             <div key={destination.id} className="destination-card">
//               <img src={destination.image} alt={destination.name} />
//               <h4>{destination.name}</h4>
//               <p>{destination.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// Destinations Component
const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDestinations(destinationsData);
  }, []);

  const handlePlanTrip = (destination) => {
    navigate('/my-trips');
  };

  return (
    <div className="destinations">
      <h2>Popular Destinations</h2>
      <div className="destination-list">
        {destinations.map(destination => (
          <div key={destination.id} className="destination-item">
            <img src={destination.image} alt={destination.name} />
            <div className="destination-info">
              <h3>{destination.name}, {destination.country}</h3>
              <p>{destination.description}</p>
              <div className="attractions">
                <h4>Top Attractions:</h4>
                <ul>
                  {destination.attractions.map((attraction, index) => (
                    <li key={index}>{attraction}</li>
                  ))}
                </ul>
              </div>
              <button onClick={() => handlePlanTrip(destination)}>Plan Trip</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Trip Planner Component
const TripPlanner = () => {
  const navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: '',
    activities: []
  });

  const [availableActivities, setAvailableActivities] = useState([
    'Sightseeing',
    'Museum Tours',
    'Local Cuisine',
    'Adventure Sports',
    'Shopping',
    'Cultural Experiences',
    'Nightlife',
    'Relaxation',
    'Photography Tours',
    'Historical Tours'
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(tripDetails.startDate) > new Date(tripDetails.endDate)) {
      alert('End date must be after start date');
      return;
    }
    
    const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    savedTrips.push({
      ...tripDetails,
      id: Date.now(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('trips', JSON.stringify(savedTrips));
    
    alert('Trip planned successfully!');
    navigate('/my-trips');
  };

  const handleActivityChange = (activity) => {
    setTripDetails(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  return (
    <div className="trip-planner-container">
      <h2>Plan Your Trip</h2>
      <div className="trip-planner-content">
        <form onSubmit={handleSubmit} className="trip-planner-form">
          <div className="form-group">
            <label>Destination:</label>
            <select
              value={tripDetails.destination}
              onChange={(e) => setTripDetails({...tripDetails, destination: e.target.value})}
              required
            >
              <option value="">Select a destination</option>
              {destinationsData.map(dest => (
                <option key={dest.id} value={dest.name}>
                  {dest.name}, {dest.country}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Start Date:</label>
              <input
                type="date"
                value={tripDetails.startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setTripDetails({...tripDetails, startDate: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>End Date:</label>
              <input
                type="date"
                value={tripDetails.endDate}
                min={tripDetails.startDate}
                onChange={(e) => setTripDetails({...tripDetails, endDate: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Number of Travelers:</label>
              <input
                type="number"
                min="1"
                value={tripDetails.travelers}
                onChange={(e) => setTripDetails({...tripDetails, travelers: parseInt(e.target.value)})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Budget (INR):</label>
              <input
                type="number"
                min="0"
                value={tripDetails.budget}
                onChange={(e) => setTripDetails({...tripDetails, budget: parseInt(e.target.value)})}
                required
                placeholder="Enter your budget"
              />
            </div>
          </div>

          <div className="form-group activities-section">
            <label>Select Activities:</label>
            <div className="activities-grid">
              {availableActivities.map(activity => (
                <div key={activity} className="activity-item">
                  <input
                    type="checkbox"
                    id={activity}
                    checked={tripDetails.activities.includes(activity)}
                    onChange={() => handleActivityChange(activity)}
                  />
                  <label htmlFor={activity}>{activity}</label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-button">Plan My Trip</button>
        </form>

        <div className="trip-summary">
          <h3>Trip Summary</h3>
          {tripDetails.destination && (
            <div className="summary-content">
              <p><strong>Destination:</strong> {tripDetails.destination}</p>
              {tripDetails.startDate && tripDetails.endDate && (
                <p><strong>Duration:</strong> {
                  Math.ceil((new Date(tripDetails.endDate) - new Date(tripDetails.startDate)) / (1000 * 60 * 60 * 24))
                } days</p>
              )}
              <p><strong>Travelers:</strong> {tripDetails.travelers}</p>
              {tripDetails.budget && <p><strong>Budget:</strong> ${tripDetails.budget}</p>}
              {tripDetails.activities.length > 0 && (
                <div className="selected-activities">
                  <strong>Selected Activities:</strong>
                  <ul>
                    {tripDetails.activities.map(activity => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Auth Components
// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login attempt:', credentials);
//     // Here you would typically authenticate with your backend
//   };

//   return (
//     <div className="auth-form">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={credentials.email}
//             onChange={(e) => setCredentials({...credentials, email: e.target.value})}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={credentials.password}
//             onChange={(e) => setCredentials({...credentials, password: e.target.value})}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <p>Don't have an account? <Link to="/register">Register here</Link></p>
//     </div>
//   );
// };

// const Register = () => {
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (userData.password !== userData.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }
//     console.log('Registration attempt:', userData);
//     // Here you would typically send registration data to your backend
//   };

//   return (
//     <div className="auth-form">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Name:</label>
//           <input
//             type="text"
//             value={userData.name}
//             onChange={(e) => setUserData({...userData, name: e.target.value})}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={userData.email}
//             onChange={(e) => setUserData({...userData, email: e.target.value})}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={userData.password}
//             onChange={(e) => setUserData({...userData, password: e.target.value})}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             value={userData.confirmPassword}
//             onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//       <p>Already have an account? <Link to="/login">Login here</Link></p>
//     </div>
//   );
// };

// Itinerary Planner Component
const ItineraryPlanner = () => {
  const navigate = useNavigate();
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [preferences, setPreferences] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    interests: [],
    pacePreference: 'moderate', // relaxed, moderate, intense
    foodPreference: 'all',
    transportMode: 'all'
  });

  const interestOptions = [
    'Historical Sites',
    'Museums',
    'Nature',
    'Shopping',
    'Local Cuisine',
    'Adventure',
    'Cultural Events',
    'Nightlife'
  ];

  const generateItinerary = () => {
    // Sample itinerary generation logic
    const start = new Date(preferences.startDate);
    const end = new Date(preferences.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    
    const activities = {
      'Historical Sites': ['Visit ancient temples', 'Explore historic district', 'Museum tour'],
      'Nature': ['Hiking trails', 'Beach visit', 'Garden tours'],
      'Shopping': ['Local markets', 'Shopping districts', 'Artisan shops'],
      'Local Cuisine': ['Food tours', 'Cooking classes', 'Restaurant visits'],
      'Adventure': ['Water sports', 'Mountain climbing', 'Zip lining'],
      'Cultural Events': ['Traditional shows', 'Local festivals', 'Art galleries']
    };

    const dailyPlans = Array.from({ length: days }, (_, dayIndex) => {
      const dayActivities = preferences.interests.flatMap(interest => 
        activities[interest] ? activities[interest] : []
      ).sort(() => Math.random() - 0.5).slice(0, 3);

      return {
        day: dayIndex + 1,
        date: new Date(start.getTime() + dayIndex * 24 * 60 * 60 * 1000).toLocaleDateString(),
        activities: dayActivities.map((activity, timeSlot) => ({
          time: ['09:00 AM', '02:00 PM', '06:00 PM'][timeSlot],
          description: activity
        })),
        meals: {
          breakfast: 'Local breakfast spot',
          lunch: 'Restaurant based on location',
          dinner: 'Traditional cuisine restaurant'
        },
        transportation: preferences.transportMode === 'all' ? 
          'Mix of public transport and walking' : preferences.transportMode
      };
    });

    setGeneratedItinerary({
      destination: preferences.destination,
      totalDays: days,
      budget: preferences.budget,
      dailyPlans: dailyPlans
    });
  };

  return (
    <div className="itinerary-planner">
      <h2>Itinerary Planner</h2>
      <div className="preferences-section">
        <div className="form-group">
          <label>Destination:</label>
          <select
            value={preferences.destination}
            onChange={(e) => setPreferences({...preferences, destination: e.target.value})}
            required
          >
            <option value="">Select a destination</option>
            {destinationsData.map(dest => (
              <option key={dest.id} value={dest.name}>
                {dest.name}, {dest.country}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={preferences.startDate}
            onChange={(e) => setPreferences({...preferences, startDate: e.target.value})}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            value={preferences.endDate}
            onChange={(e) => setPreferences({...preferences, endDate: e.target.value})}
            min={preferences.startDate}
            required
          />
        </div>

        <div className="form-group budget-input">
          <label>Budget (₹):</label>
          <input
            type="number"
            value={preferences.budget}
            onChange={(e) => setPreferences({...preferences, budget: e.target.value})}
            placeholder="Enter your budget in Rupees"
            required
          />
        </div>

        <div className="form-group">
          <label>Interests:</label>
          <div className="preferences-grid">
            {interestOptions.map(interest => (
              <div key={interest} className="preference-item">
                <input
                  type="checkbox"
                  id={interest}
                  checked={preferences.interests.includes(interest)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPreferences({...preferences, interests: [...preferences.interests, interest]});
                    } else {
                      setPreferences({...preferences, interests: preferences.interests.filter(i => i !== interest)});
                    }
                  }}
                />
                <label htmlFor={interest}>{interest}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Travel Pace:</label>
          <select
            value={preferences.pacePreference}
            onChange={(e) => setPreferences({...preferences, pacePreference: e.target.value})}
          >
            <option value="relaxed">Relaxed</option>
            <option value="moderate">Moderate</option>
            <option value="intense">Intense</option>
          </select>
        </div>

        <button className="build-itinerary-btn" onClick={generateItinerary}>
          Generate Itinerary
        </button>
      </div>

      {generatedItinerary && (
        <div className="generated-itinerary">
          <h3>Your {generatedItinerary.totalDays}-Day Itinerary for {generatedItinerary.destination}</h3>
          <p>Total Budget: ₹{generatedItinerary.budget}</p>
          
          <div className="itinerary-days">
            {generatedItinerary.dailyPlans.map((day) => (
              <div key={day.day} className="itinerary-day">
                <div className="day-header">
                  <h3>Day {day.day} - {day.date}</h3>
                </div>
                
                <div className="day-activities">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-time">{activity.time}</div>
                      <div className="activity-details">
                        <h4>{activity.description}</h4>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="meals-section">
                  <h4>Meals</h4>
                  <p><strong>Breakfast:</strong> {day.meals.breakfast}</p>
                  <p><strong>Lunch:</strong> {day.meals.lunch}</p>
                  <p><strong>Dinner:</strong> {day.meals.dinner}</p>
                </div>

                <div className="transportation-section">
                  <h4>Transportation</h4>
                  <p>{day.transportation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/plan">Itinerary Planner</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/my-trips">My Trips</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/" /> : 
              <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
            } 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
          />
          <Route 
            path="/my-trips" 
            element={isAuthenticated ? <MyTrips /> : <Navigate to="/login" />} 
          />
          <Route
            path="/plan"
            element={<TripPlanner />}
          />
        </Routes>

        <footer className="main-footer">
          <p>&copy; 2024 Travel Planner. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
