import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Auth from "./Pages/Auth";
import BrowseItems from "./Pages/BrowseItems";
import Navbar from "./Components/Navbar";
import ProductDetails from "./Components/ProductDetails";
import mockProducts from "./data/mockProducts.json";
import RequestSubmission from "./Pages/RequestSubmission";
import MyRequests from "./Pages/MyRequests";
import Confirmation from "./Pages/Confirmation";
import AdminDashboard from "./Pages/AdminDashboard";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(fetchCurrentUser());
    }
  }, [user, dispatch]);

  const [userRequests, setUserRequests] = useState([
    {
      id: 1,
      productName: "Wooden Desk",
      details: "For educational purposes in a local school.",
      status: "Pending",
      instructions: "",
    },
    {
      id: 2,
      productName: "Laptop",
      details: "To support online education for underprivileged children.",
      status: "Approved",
      instructions: "Pick up at 123 Main Street, Austin, TX.",
    },
    {
      id: 3,
      productName: "Leather Chair",
      details: "Furniture for a non-profit office.",
      status: "Rejected",
      instructions: "",
    },
  ]);

  // Custom component to handle conditional rendering
  const Layout = ({ children }) => {
    const location = useLocation();

    // Hide navbar on these pages
    const hideNavbarPaths = ["/", "/login"];
    const hideNavbar = hideNavbarPaths.includes(location.pathname);

    return (
      <div className="min-h-screen">
        {!hideNavbar && <Navbar user={user} />}
        {children}
      </div>
    );
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/browse-items" replace /> : <LandingPage />
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/browse-items" element={<BrowseItems />} />
          <Route
            path="/product/:id"
            element={<ProductDetails products={mockProducts} />}
          />
          <Route path="/request-submission" element={<RequestSubmission />} />
          <Route
            path="/my-requests"
            element={<MyRequests requests={userRequests} />}
          />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
