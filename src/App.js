import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import LandingPage from "./Pages/LandingPage";
import Auth from "./Pages/Auth";
import BrowseItems from "./Pages/BrowseItems";
import ProductDetails from "./Components/ProductDetails";
import mockProducts from "./data/mockProducts.json";
import RequestSubmission from "./Pages/RequestSubmission";
import MyRequests from "./Pages/MyRequests";
import Confirmation from "./Pages/Confirmation";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/authSlice";
import Sidebar from "./Components/Sidebar";
import OrganizationsList from "./Pages/OrganizationsList";
import OrganizationDetails from "./Pages/OrganizationDetails";
import OrganizationEdit from "./Pages/AdminDashboard/OrganizationEdit";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  // Custom component to handle conditional rendering
  const Layout = ({ children }) => {
    const location = useLocation();

    // Hide navbar and sidebar on these pages
    const hidePaths = ["/", "/login", "/Login"];
    const hideSidebar = hidePaths.includes(location.pathname);

    return (
      <div className="min-h-screen flex">
        {!hideSidebar && <Sidebar user={user} />}{" "}
        {/* Sidebar is conditionally rendered */}
        <div className="flex-1">
          <main>{children}</main>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth />} />

          {/* Protected Routes */}
          <Route
            path="/browse-items"
            element={
              <ProtectedRoute>
                <BrowseItems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails products={mockProducts} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/request-submission"
            element={
              <ProtectedRoute>
                <RequestSubmission />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-requests"
            element={
              <ProtectedRoute>
                <MyRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirmation"
            element={
              <ProtectedRoute>
                <Confirmation />
              </ProtectedRoute>
            }
          />

          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/organizations"
            element={
              <ProtectedRoute role="ADMIN">
                <OrganizationsList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/organization/:id"
            element={
              <ProtectedRoute role="ADMIN">
                <OrganizationDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/organization/:id/edit"
            element={
              <ProtectedRoute role="ADMIN">
                <OrganizationEdit />
              </ProtectedRoute>
            }
          />

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
