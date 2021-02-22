import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/categorySlice";
function Category() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <CateSection>
              <h3>category</h3>
              <button>add</button>
            </CateSection>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

const CateSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

export default Category;
