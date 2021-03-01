import React, { useEffect } from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CategoryListType, categoryLoading, createCategories, getAllCategories } from "../../redux/categorySlice";
import { selectCategory } from "../../redux/mainReducer";
import { useState } from "react";
import Input from "../../components/UI/Input/Input";
import ModalMaker from "../../components/UI/modal/Modals";
import CheckboxTree, { Node } from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

function Category() {
  const dispatch = useDispatch();

  //for category rendering
  const [cateName, setCateName] = useState("");
  const [parentCateId, setParentCateId] = useState("");
  const [cateImg, setCateImg] = useState("");

  const { categoryList } = useSelector(selectCategory).categories;
  console.log(typeof categoryList);

  interface RenderedCategoryReturnType extends Node {}
  type RenederedCategoryType = (categoryList: CategoryListType[]) => RenderedCategoryReturnType[];

  const renderCategory: RenederedCategoryType = (categoryList) => {
    let renderedCategory: Node[] = [];
    if (categoryList) {
      for (let category of categoryList) {
        renderedCategory.push({
          label: category.name,
          value: category._id,
          children: renderCategory(category.children),
        });
      }
    }

    return renderedCategory;
  };
  console.log(renderCategory(categoryList));

  const createCategoryList = (categories: any, options: any[] = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  //for modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChanges = () => {
    dispatch(categoryLoading("pending"));
    const form = new FormData();
    form.append("name", cateName);
    form.append("parentId", parentCateId);
    form.append("categoryImage", cateImg);

    dispatch(createCategories(form));

    dispatch(categoryLoading("finisihed"));
    setShow(false);

    window.location.reload();
  };

  //for react-check-box
  const [checked, setChecked] = useState([] as any[]);
  const [expanded, setExpanded] = useState([] as any[]);

  const modalBody = () => {
    return (
      <>
        <Input type="text" placeholder="category name" onChange={(e: any) => setCateName(e.target.value)} />
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
        <input
          type="file"
          name="categoryImage"
          onChange={(e: any) => {
            setCateImg(e.target.files[0]);
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
            <CateSection>
              <h3>category</h3>
              <button onClick={handleShow}>add</button>
            </CateSection>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* {categoryList !== undefined && renderCategory(categoryList)} */}
            <CheckboxTree
              nodes={renderCategory(categoryList)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
            />
          </Col>
        </Row>
      </Container>

      <ModalMaker show={show} handleChanges={handleChanges} handleClose={handleClose} modalBody={modalBody} title="category" />

      {/*   <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>add new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input type="text" placeholder="category name" onChange={(e: any) => setCateName(e.target.value)} />
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
          <input
            type="file"
            name="categoryImage"
            onChange={(e: any) => {
              setCateImg(e.target.files[0]);
            }}
          />
        </Modal.Body>
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

const CateSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

export default Category;
