import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/UI/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
import axios from "../../axios/axios";
import { useState } from "react";
import { selectUser } from "../../redux/mainReducer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user);

  const userLogin = async (e?: any) => {
    e.preventDefault();

    const res = await axios.post(
      "/auth_admin/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    if (res.status === 200) {
      dispatch(login(res.data.targetAdmin));
    }
  };

  console.log(email, password);
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input label="Email" type="email" placeholder="Enter email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />

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
