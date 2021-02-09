import React from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Jumbotron style={{ margin: "5rem", background: "#fff" }} className="text-center">
        <h1>Welcom to admin dashboard</h1>
        <p>this is test page</p>
      </Jumbotron>
    </Layout>
  );
}
