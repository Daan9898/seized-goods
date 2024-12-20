import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Auth from './Pages/Auth';
import BrowseItems from './Pages/BrowseItems';
import Navbar from './Components/Navbar';
import ProductDetails from './Components/ProductDetails';
import mockProducts from './data/mockProducts.json';
import RequestSubmission from './Pages/RequestSubmission';
import MyRequests from './Pages/MyRequests';
import Confirmation from './Pages/Confirmation';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (email, password) => {
    // Mock user data; replace with real authentication logic as needed
    const mockUser = {
      name: 'Patrick Junior',
      email: email,
      image: 'https://via.placeholder.com/40',
    };
    setUser(mockUser);
  };

  const [userRequests, setUserRequests] = useState([
    {
      id: 1,
      productName: 'Wooden Desk',
      details: 'For educational purposes in a local school.',
      status: 'Pending',
      instructions: '',
    },
    {
      id: 2,
      productName: 'Laptop',
      details: 'To support online education for underprivileged children.',
      status: 'Approved',
      instructions: 'Pick up at 123 Main Street, Austin, TX.',
    },
    {
      id: 3,
      productName: 'Leather Chair',
      details: 'Furniture for a non-profit office.',
      status: 'Rejected',
      instructions: '',
    },
  ]);

  return (
    <Router>
      <div className="min-h-screen">
        {user && <Navbar user={user} />}
        <Routes>
          <Route path="/" element={user ? <Navigate to="/browse-items" replace /> : <LandingPage />} />
          <Route path="/login" element={<Auth onLogin={handleLogin} />} />
          <Route path="/browse-items" element={<BrowseItems />} />
          <Route path="/product/:id" element={<ProductDetails products={mockProducts} />} />
          <Route path="/request-submission" element={<RequestSubmission />} />
          <Route path="/my-requests" element={<MyRequests requests={userRequests} />} />
          <Route path="/confirmation" element={<Confirmation />} />
          {/* Add a catch-all route for 404 pages if needed */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
