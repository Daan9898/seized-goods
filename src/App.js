import React, { useEffect } from "react";
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
import ProductDetails from "./Components/ProductDetails";
import mockProducts from "./data/mockProducts.json";
import RequestSubmission from "./Pages/RequestSubmission";
import MyRequests from "./Pages/MyRequests";
import Confirmation from "./Pages/Confirmation";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/authSlice";
import ManageProducts from "./Pages/AdminDashboard/ManageProducts";
import Sidebar from "./Components/Sidebar";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(fetchCurrentUser());
    }
  }, [user, dispatch]);

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
          <Route
            path="/"
            element={
              user ? <Navigate to="/browse-items" replace /> : <LandingPage />
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/products-management" element={<ManageProducts />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/browse-items" element={<BrowseItems />} />
          <Route
            path="/product/:id"
            element={<ProductDetails products={mockProducts} />}
          />
          <Route path="/request-submission" element={<RequestSubmission />} />
          <Route path="/my-requests" user={user} element={<MyRequests />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
