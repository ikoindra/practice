import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { register } from "../services/auth";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/register")({
  component: Register,
});

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined);

  useEffect(() => {
    // get token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      navigate({ to: "/" });
    }
  }, [navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      toast.error("Password and password confirmation must be same!");
      return;
    }

    // hit api here
    const request = {
      name,
      email,
      password,
      profilePicture,
    };
    const result = await register(request);
    if (result.success) {
      // save token to local storage
      dispatch(setToken(result.data.token));

      //redirect to home
      navigate({ to: "/" });
      return;
    }

    toast.error(result.message);
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Register</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm="3">
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="name"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="email">
                <Form.Label column sm="3">
                  Email
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="password">
                <Form.Label column sm="3">
                  Password
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3 align-items-center"
                controlId="confirmPassword"
              >
                <Form.Label column sm="3">
                  Confirm Password
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3 align-items-center"
                controlId="profilePicture"
              >
                <Form.Label column sm="3">
                  Profile Picture
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="file"
                    placeholder="Profile Picture"
                    onChange={(event) => {
                      setProfilePicture(event.target.files[0]);
                    }}
                    accept=".jpg,.png"
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Register
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
