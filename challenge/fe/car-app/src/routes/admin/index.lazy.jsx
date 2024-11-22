import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";

export const Route = createLazyFileRoute("/admin/")({
  component: Index,
});

function Index() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate({ to: "/" });
    } else {
      setIsCheckingAuth(false);
    }
  }, [token, navigate]);

  if (isCheckingAuth || isLoading) {
    return (
      <Row className="mt-4">
        <h1>Loading...</h1>
      </Row>
    );
  }

  return (
    <Row className="mt-4">
      <h1>Selamat Datang Di Website Kelompok 4</h1>
    </Row>
  );
}
