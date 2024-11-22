import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { register } from "../service/auth";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { loginGoogle } from "../service/auth";

export const Route = createLazyFileRoute("/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined);

  useEffect(() => {
    // get token from local storage
    if (token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      toast.error("Password and password confirmation must be same!");
      return;
    }

    // hit API here
    const request = {
      name,
      email,
      password,
      profilePicture,
    };
    const result = await register(request);
    if (result.success) {
      // save token to local storage
      localStorage.setItem("token", result.data.token);

      // redirect to home
      window.location = "/";

      return;
    }

    toast.error(result?.message);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const googleAccessToken = tokenResponse.access_token;
      const result = await loginGoogle(googleAccessToken);

      if (result.success) {
        localStorage.setItem("token", result.data.token);

        navigate({ to: "/" });
      } else {
        toast.error(result.message || "Google login failed.");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <Row style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
        <Col md={6}>
          <Container
            className="px-5 d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100 m-lg-5 m-0">
              <h2 className="mb-4">Register</h2>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Col} className="mb-2" controlId="name">
                  <Form.Label className="mb-2">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-2" controlId="email">
                  <Form.Label className="mb-2">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-2" controlId="password">
                  <Form.Label className="mb-2">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="mb-2"
                  controlId="confirmPassword"
                >
                  <Form.Label className="mb-2">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="mb-4"
                  controlId="profilePicture"
                >
                  <Form.Label className="mb-2">Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Choose File"
                    required
                    onChange={(event) => {
                      setProfilePicture(event.target.files[0]);
                    }}
                    accept=".jpg,.png"
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#0D28A6",
                      borderColor: "#0D28A6",
                      marginBottom: "2px",
                    }}
                    className="rounded-0"
                  >
                    Register
                  </Button>
                  <Button
                    onClick={googleLogin}
                    variant="primary"
                    style={{
                      backgroundColor: "#0D28A6",
                      borderColor: "#0D28A6",
                    }}
                    className="rounded-0"
                  >
                    Register with Google
                  </Button>
                </div>
              </Form>
              <p className="text-center p-3">
                Already have an account? <a href="/login">Sign in here</a>
              </p>
            </div>
          </Container>
        </Col>
        <Col
          md={6}
          style={{ overflow: "hidden", height: "100vh", position: "relative" }}
          className="d-none d-md-block"
        >
          <img
            src="/login-page.png"
            alt="Login Page"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Col>
      </Row>
    </>
  );
}
