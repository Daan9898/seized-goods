import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Auth from "./Pages/Auth";
import BrowseItems from "./Pages/BrowseItems";
import Navbar from "./Components/Navbar";

const App = () => {
  const [user, setUser] = React.useState(null);

  const handleLogin = (email, password, navigate) => {
    // Mock login functionality
    const mockUser = {
      name: "Patrick Junior",
      email: email,
      image: "https://via.placeholder.com/40",
    };
    setUser(mockUser);
    navigate("/browse-items"); // Navigate to BrowseItems after login
  };

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Auth onLogin={handleLogin} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar user={user} /> {/* Always show the Navbar after login */}
        <Routes>
          <Route path="/" element={<Navigate to="/browse-items" replace />} />
          <Route path="/browse-items" element={<BrowseItems user={user} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
