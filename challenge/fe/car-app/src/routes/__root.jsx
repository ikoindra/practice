import React from "react";
import {
  createRootRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux"; // To access Redux state
import NavigationBar from "../components/NavBar/index.jsx";
import Sidebar from "../components/SideBar/index.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const Route = createRootRoute({
  component: () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth); // Get user from Redux

    const isAdminRoute =
      location.pathname.startsWith("/admin") && user?.role_id === 1;

    const isNavbarHidden = ["/login", "/register"].includes(location.pathname);

    React.useEffect(() => {
      if (location.pathname.startsWith("/admin") && user?.role_id !== 1) {
        navigate({ to: "/" }); // Redirect non-admin users
      }
    }, [location.pathname, user?.role_id, navigate]);

    return (
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
      >
        {isAdminRoute && <Sidebar />}
        {!isNavbarHidden && <NavigationBar />}

        <Container fluid={!isAdminRoute} className={!isAdminRoute ? "p-0" : ""}>
          <Outlet />
        </Container>

        <TanStackRouterDevtools />
        <ToastContainer theme="colored" />
      </GoogleOAuthProvider>
    );
  },
});
