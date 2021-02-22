import React, { PropsWithChildren, ReactNode } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header/Header";

export default function Layout(props: PropsWithChildren<{ sidebar?: boolean }>) {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <HomeMain>
          <Container fluid>
            <Row>
              <Col md={2} className="sidebar">
                <ul>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/products">Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="/orders">Orders</NavLink>
                  </li>
                </ul>
              </Col>
              <Col md={10} className="main_contents">
                {props.children}
              </Col>
            </Row>
          </Container>
        </HomeMain>
      ) : (
        props.children
      )}
    </>
  );
}

const HomeMain = styled.main`
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #eee;
    padding-top: 57px;
    box-shadow: inset 0 0 2px gray;
  }

  .main_contents {
    margin-left: auto;
  }
`;
