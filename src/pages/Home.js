import React, {  useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { io } from "socket.io-client";
import Cookie from "universal-cookie";
import{ useDispatch} from "react-redux"
import { login_user } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const socket = useRef(null);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cookie = new Cookie();

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    console.log("loginPage connected");
  }, []);

  useEffect(() => {
    submit && socket.current && socket?.current.emit("loginUser", credential);
    setSubmit(false);
  }, [submit]);

  useEffect(() => {
    socket.current &&
      socket.current.on("setHeader", (token) => {
        cookie.set("JWT", token, {
          sameSite:'strict',
          path: '/',
          maxAge: 60 * 1,
          secure: false,
        });

        dispatch(login_user(credential));
        toast.success("logged in successfully");
        navigate("/jobList");


      });
  }, [socket.current]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  return (
    <Container
      style={{ height: "80vh", width: "60vw" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <Form style={{ width: "30vw" }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) =>
              setCredential({ ...credential, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setCredential({ ...credential, password: e.target.value })
            }
          />
        </Form.Group>
        <div className="d-grid gap-2 mt-4">
          <Button variant="primary" size="md" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Home;
