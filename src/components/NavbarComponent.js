import React, { useEffect, useRef, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const [battery,setBattery] = useState();

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    console.log("connect NAVBAR");
  }, []);
  useEffect(() => {
    socket.current && socket.current.on("batteryInfo",data=>setBattery(data))
  }, [socket.current]);


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>
          PatikaRobotics
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/jobcreate")}>
              JobCreate
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/joblist")}>Job List</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="yellow"
              className ="bi bi-battery-half align-self-center"
              viewBox="0 0 16 16"
            >
              <path d="M2 6h5v4H2V6z" />
              <path d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h10zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z" />
            </svg>

            <Nav.Link eventKey={2}>
              {battery ? `%${battery.batteryLevel}` : <Spinner animation="border" role="status" size="sm">
      <span className="visually-hidden">Loading...</span>
    </Spinner>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
