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
import { IoIosCheckbox, IoIosCheckboxOutline, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

function Category() {
  const dispatch = useDispatch();

  //for category rendering
  const [cateName, setCateName] = useState("");
  const [parentCateId, setParentCateId] = useState("");
  const [cateImg, setCateImg] = useState("");

  const { categoryList } = useSelector(selectCategory).categories;

  interface RenderedCategoryReturnType extends Node {}
  type RenederedCategoryType = (categoryList: CategoryListType[]) => RenderedCategoryReturnType[];

  const renderCategory: RenederedCategoryType = (categoryList) => {
    let renderedCategory: Node[] = [];
    if (categoryList) {
      for (let category of categoryList) {
        const childrenForm = (category: CategoryListType) => {
          if (renderCategory(category.children).length > 0) {
            return renderCategory(category.children);
          } else {
            return undefined;
          }
        };

        renderedCategory.push({
          value: category._id,
          label: category.name,

          children: childrenForm(category),
        });
      }
    }

    return renderedCategory;
  };

  const createCategoryList = (categories: any, options: any[] = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name, parentId: category.parentId });
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
  const [checkedForShowing, setCheckedForShowing] = useState([] as any[]);
  const [expandedArrForshowing, setExpandedArrForshowing] = useState([] as any[]);

  console.log(checkedForShowing, expandedArrForshowing);

  const [updateShow, setUpdateShow] = useState(false);
  const handleUpdateClose = () => setUpdateShow(false);

  const handleUpdateShow = () => {
    const renderedCategory = createCategoryList(categoryList);
    let renderedCheckedArr = [] as any[];
    let renderedExtandArr = [] as any[];

    if (checked.length === 0) {
      setCheckedForShowing([]);
    } else {
      checked.length > 0 &&
        checked.forEach((eachChecked) => {
          const targetData = renderedCategory.find((eachData) => eachData.value === eachChecked);

          targetData && renderedCheckedArr.push(targetData);
          setCheckedForShowing(renderedCheckedArr);
        });
    }

    if (expanded.length === 0) {
      setExpandedArrForshowing([]);
    } else {
      expanded.length > 0 &&
        expanded.forEach((eachExtend) => {
          const targetData = renderedCategory.find((eachData) => eachData.value === eachExtend);
          targetData && renderedExtandArr.push(targetData);
          setExpandedArrForshowing(renderedExtandArr);
        });
    }

    setUpdateShow(true);
  };

  const handleUpdateTyping = (key: string, value: string, index: number, type: "checked" | "expanded") => {
    if (type === "checked") {
      const updatedCheckedArr = checkedForShowing.map((eachChecked, eachIndex) =>
        index === eachIndex ? { ...eachChecked, [key]: value } : eachChecked
      );

      setCheckedForShowing(updatedCheckedArr);
    }

    if (type === "expanded") {
      const updatedExpnadArr = expandedArrForshowing.map((eachExpand, eachIndex) =>
        index === eachIndex ? { ...eachExpand, [key]: value } : eachExpand
      );

      setExpandedArrForshowing(updatedExpnadArr);
    }
  };

  const handleUpdateChanges = () => {
    dispatch(categoryLoading("pending"));
    setUpdateShow(false);
    dispatch(categoryLoading("finisihed"));
  };

  //* modal body
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

  const modalUpdateBody = () => {
    return (
      <>
        <Row>
          <Col>
            <h6>Checked List</h6>
          </Col>
        </Row>

        {checkedForShowing.length > 0 &&
          checkedForShowing.map((eachChecked, index) => {
            return (
              <Row key={index}>
                <Col>
                  <Input
                    value={eachChecked.name}
                    type="text"
                    placeholder="category name"
                    onChange={(e: any) => handleUpdateTyping("name", e.target.value, index, "checked")}
                  />
                </Col>

                <Col>
                  <select
                    className="form-control"
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
                </Col>

                <Col>
                  <select className="form-control">
                    <option value="">select type</option>
                    <option value="store">Store</option>
                    <option value="product">Product</option>
                    <option value="page">Page</option>
                  </select>
                </Col>
              </Row>
            );
          })}

        <Row>
          <Col>
            <h6>Expanded List</h6>
          </Col>
        </Row>

        {expandedArrForshowing.length > 0 &&
          expandedArrForshowing.map((eachExpand, index) => {
            return (
              <Row key={index}>
                <Col>
                  <Input
                    value={eachExpand.name}
                    type="text"
                    placeholder="category name"
                    onChange={(e: any) => handleUpdateTyping("name", e.target.value, index, "expanded")}
                  />
                </Col>

                <Col>
                  <select
                    className="form-control"
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
                </Col>

                <Col>
                  <select className="form-control">
                    <option value="">select type</option>
                    <option value="store">Store</option>
                    <option value="product">Product</option>
                    <option value="page">Page</option>
                  </select>
                </Col>
              </Row>
            );
          })}
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
            <CheckboxTree
              nodes={renderCategory(categoryList)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
          <Col>
            <button onClick={handleUpdateShow}>update</button>
          </Col>
        </Row>
      </Container>

      <ModalMaker show={show} handleClose={handleClose} handleChanges={handleChanges} modalBody={modalBody} title="category" />
      <ModalMaker show={updateShow} handleClose={handleUpdateClose} handleChanges={handleUpdateChanges} modalBody={modalUpdateBody} title="Update" />
    </Layout>
  );
}

const CateSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

export default Category;
