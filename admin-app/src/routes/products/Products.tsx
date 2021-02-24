import React, { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/UI/Input/Input";
import Modals from "../../components/UI/modal/Modals";
import { categoryLoading, createCategories, getAllCategories } from "../../redux/categorySlice";
import { selectCategory } from "../../redux/mainReducer";
import { setProducts } from "../../redux/productSlice";
import Category from "../Category/Category";

function Products() {
  const dispatch = useDispatch();

  //for category rendering
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

  //for products rendering

  const tableRendering = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  //for modal

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [productPictures, setProductPictures] = useState([] as any[]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setName("");
    setPrice(0);
    setDescription("");
    setCategoryId("");
    setQuantity(0);
    setProductPictures([]);

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleChanges = () => {
    dispatch(categoryLoading("pending"));
    const form = new FormData();

    form.append("name", name);
    form.append("price", price.toString().replace(/(^0+)/, ""));
    form.append("description", description);
    form.append("quantity", quantity.toString().replace(/(^0+)/, ""));
    for (let pic of productPictures) {
      form.append("productPictures", pic);
    }
    form.append("parentCateId", categoryId);
    dispatch(setProducts(form));
    handleClose();
    dispatch(categoryLoading("finisihed"));
  };

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
          type="number"
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
          type="number"
          value={quantity}
          placeholder="quantity"
          onChange={(e: any) => {
            setQuantity(e.target.value);
          }}
        />

        <select
          className="form-control"
          value={categoryId}
          onChange={(e: any) => {
            setCategoryId(e.target.value);
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

        <Row>
          <Col>{tableRendering()}</Col>
        </Row>
      </Container>

      <Modals show={show} handleChanges={handleChanges} handleClose={handleClose} modalBody={modalInputs} title="product" />

      {/*  <Modal show={show} onHide={handleClose} animation={false}>
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
      </Modal> */}
    </Layout>
  );
}

const ProductSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

export default Products;
