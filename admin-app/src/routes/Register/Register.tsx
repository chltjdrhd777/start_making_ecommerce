import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/UI/Input/Input";

export default function Register() {
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Row>
                <Col md={6}>
                  <Input label="First Name" type="text" placeholder="Enter first name" value="" onChange={() => {}} />
                </Col>

                <Col md={6}>
                  <Input label="Last Name" type="text" placeholder="Enter Last name" value="" onChange={() => {}} />
                </Col>
              </Row>

              <Input label="Email" type="email" placeholder="Enter email" value="" onChange={() => {}} />
              <Input label="Password" type="password" placeholder="Enter password" value="" onChange={() => {}} />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
