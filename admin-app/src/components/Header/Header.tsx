import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout, userLogouts } from "../../redux/userSlice";
import { selectUser } from "../../redux/mainReducer";

export default function Header() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(selectUser);

  const logoutFunc = () => {
    dispatch(userLogouts({}));
  };

  const ifLoggedIn = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link logout_btn" onClick={logoutFunc} style={{ cursor: "pointer" }}>
            Log out
          </span>
        </li>
      </Nav>
    );
  };

  const ifLoggedOut = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="/register" className="nav-link">
            Register
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" className="navbar" style={{ zIndex: 1 }}>
      <Container fluid>
        {/*  <Navbar.Brand href="#home">Admin dashboard</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">
          Admin Dashboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/*  <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
          </Nav>
          {userInfo ? ifLoggedIn() : ifLoggedOut()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
