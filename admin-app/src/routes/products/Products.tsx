import React, { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/UI/Input/Input";
import { categoryLoading, createCategories, getAllCategories } from "../../redux/categorySlice";
import { selectCategory } from "../../redux/mainReducer";
import Category from "../Category/Category";

function Products() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const { categoryList } = useSelector(selectCategory).categories;

  const createCategoryList = (categories: any, options: any[] = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  useEffect(() => {
    dispatch(categoryLoading("pending"));
    dispatch(getAllCategories());
    dispatch(categoryLoading("finished"));
  }, []);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productPictures, setProductPictures] = useState([] as any[]);
  const [parentCateId, setParentCateId] = useState("");

  const handleChanges = () => {
    setShow(false);
  };

  console.log(productPictures);

  const modalInputs = () => {
    return (
      <>
        <Input
          label="Name"
          value={name}
          placeholder="Product name"
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />

        <Input
          label="Price"
          value={price}
          placeholder="price"
          onChange={(e: any) => {
            setPrice(e.target.value);
          }}
        />

        <Input
          label="Description"
          value={description}
          placeholder="description"
          onChange={(e: any) => {
            setDescription(e.target.value);
          }}
        />

        <Input
          label="Quantity"
          value={quantity}
          placeholder="quantity"
          onChange={(e: any) => {
            setQuantity(e.target.value);
          }}
        />

        <select
          className="form-control"
          value={parentCateId}
          onChange={(e: any) => {
            setParentCateId(e.target.value);
          }}
        >
          <option>select category</option>
          {categoryList !== undefined &&
            createCategoryList(categoryList).map((e) => (
              <option key={e.value} value={e.value}>
                {e.name}
              </option>
            ))}
        </select>

        <article style={{ marginTop: "0.5rem", marginBottom: "0.5rem", border: " 1px solid black" }}>
          <p style={{ fontWeight: 800 }}>selected file list</p>
          {productPictures.length > 0 &&
            productPictures.map((pic, index): any => {
              return <div key={index}>{pic.name}</div>;
            })}
        </article>

        <input
          type="file"
          name="productPictures"
          onChange={(e: any) => {
            setProductPictures([...productPictures, e.target.files[0]]);
          }}
        />
      </>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <ProductSection>
              <h3>Product</h3>
              <button onClick={handleShow}>add</button>
            </ProductSection>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>add new category</Modal.Title>
        </Modal.Header>

        <Modal.Body>{modalInputs()}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

const ProductSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

export default Products;
