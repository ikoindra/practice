import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { profile } from "../../service/auth";
import Protected from "../../components/Auth/Protected";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const result = await profile(token);
        if (result.success) {
          dispatch(setUser(result.data));
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
        handleLogout();
      }
    };

    if (token) {
      getProfile();
    }
  }, [dispatch, navigate, token]);

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate({ to: "/" });
  };

  const handleLinkClick = () => {
    setExpanded(false);
  };

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const isAdmin = user?.role_id === 1;

  return (
    <div style={{ backgroundColor: "#f1f3ff" }}>
      {location.pathname.startsWith("/admin") && isAdmin ? (
        <Protected roles={[1]}>
          <Navbar
            collapseOnSelect
            expand="lg"
            className="bg-body-tertiary"
            style={{ zIndex: 2 }}
            expanded={expanded}
            onToggle={(expanded) => setExpanded(expanded)}
          >
            <Container>
              <Navbar.Brand
                as={Link}
                to="/"
                style={{
                  fontWeight: "bold",
                  color: "#0D28A6",
                  marginLeft: "25px",
                }}
              >
                Binar Car Rental
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link as={Link} to="/profile" onClick={handleLinkClick}>
                    <Image
                      src={user?.profile_picture}
                      fluid
                      style={{
                        width: "30px",
                        height: "30px",
                        display: "inline-block",
                        overflow: "hidden",
                        borderRadius: "50%",
                        marginRight: "3px",
                      }}
                    />
                    {user?.name}
                  </Nav.Link>
                  <Nav.Link
                    onClick={(event) => {
                      handleLinkClick(event);
                      handleLogout();
                    }}
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Protected>
      ) : (
        <Navbar
          className="navbar navbar-expand-lg"
          collapseOnSelect
          expand="lg"
          style={{ zIndex: 2 }}
        >
          <Container fluid>
            <Navbar.Brand
              as={Link}
              to="/"
              style={{
                fontWeight: "bold",
                color: "#0D28A6",
                marginLeft: "25px",
              }}
            >
              Binar Rental
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
            <Navbar.Collapse id="navbarNavAltMarkup">
              <Nav
                className="d-lg-flex align-items-lg-center flex-column flex-lg-row"
                style={{ fontSize: "14px" }}
              >
                <Nav.Link
                  className="ms-lg-3 me-4 mt-3 mt-lg-0"
                  href="#our-services"
                >
                  Our Services
                </Nav.Link>
                <Nav.Link className="ms-lg-3 me-4 mt-3 mt-lg-0" href="#why-us">
                  Why Us
                </Nav.Link>
                <Nav.Link
                  className="ms-lg-3 me-4 mt-3 mt-lg-0"
                  href="#testimonial"
                >
                  Testimonial
                </Nav.Link>
                <Nav.Link
                  className="ms-lg-3 me-4 mt-3 mt-lg-0"
                  href="#frequent"
                >
                  FAQ
                </Nav.Link>
              </Nav>
              <Nav className="ms-lg-auto mt-2">
                {token ? (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/profile"
                      onClick={handleLinkClick}
                      style={{
                        display: "inline-flex", // Ensure inline behavior
                        alignItems: "center", // Vertically align content
                      }}
                    >
                      <Image
                        src={user?.profile_picture}
                        fluid
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "8px", // Space between image and name
                        }}
                      />
                      {user?.name}
                    </Nav.Link>
                    <Nav.Link
                      className="ms-lg-3 me-4 mt-2 mt-lg-0"
                      style={{
                        display: "inline-flex", // Ensure inline behavior
                        alignItems: "center", // Vertically align content
                      }}
                      onClick={(event) => {
                        handleLinkClick(event);
                        handleLogout();
                      }}
                    >
                      Logout
                    </Nav.Link>
                    {user?.role_id === 1 && (
                      <Link
                        to="/admin"
                        className="btn btn-primary ms-lg-3 mt-3 mt-lg-0 mb-2"
                        style={{
                          backgroundColor: "#0D28A6",
                          borderColor: "#0D28A6",
                          padding: "0.5em 1em",
                          borderRadius: "4px",
                          color: "white",
                          textDecoration: "none",
                          display: "inline-block",
                          textAlign: "center",
                        }}
                        onClick={handleLinkClick}
                      >
                        Admin
                      </Link>
                    )}
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-primary ms-lg-3 mt-3 mt-lg-0 me-4"
                    style={{
                      backgroundColor: "#5CB85F",
                      borderColor: "#5CB85F",
                      padding: "0.5em 1em",
                      borderRadius: "4px",
                      color: "white",
                      textDecoration: "none",
                      display: "inline-block",
                      textAlign: "center",
                    }}
                    onClick={handleLinkClick}
                  >
                    Login
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
};

export default NavigationBar;
