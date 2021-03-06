import React, { ChangeEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/UI/Input/Input";
import Modals from "../../components/UI/modal/Modals";
import { createCategoryList } from "../../controller/common";
import { selectCategory } from "../../redux/mainReducer";
import Select from "react-select";
import styled from "styled-components";

function Page() {
  //# for createPage modal
  const [createPageShow, setCreatePageShow] = useState(false);

  const [renderedCata, setRenderedCate] = useState([] as { value: string; name: string; parentId: string; type: string }[]);
  const [cateId, setCateId] = useState("");
  const [pagetitle, setPageTitle] = useState("");
  const [description, setDescription] = useState("");
  const [banners, setBannsers] = useState([]);
  const [products, setProducts] = useState([]);

  const {
    categories: { categoryList },
  } = useSelector(selectCategory);

  useEffect(() => {
    if (categoryList !== undefined) {
      const renderedList = createCategoryList(categoryList);
      setRenderedCate(renderedList);
    }
  }, [categoryList]);

  const handleCreatePageShow = () => {
    setCreatePageShow(true);
  };
  const handleCreatePageClose = () => {
    setCreatePageShow(false);
  };
  const handleCreatePageChanges = () => {
    handleCreatePageClose();
  };

  const handleBanners = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };
  const handleProducts = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  //# react-select
  const [selectedCateId, setSelectedCateId] = useState("");

  //////////////////////////

  const createPageModalBody = () => {
    return (
      <Container>
        <Row>
          <Col>
            <Input
              label="Create Page"
              type="text"
              placeholder="create page"
              value={pagetitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPageTitle(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Input
              type="text"
              placeholder="create page"
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            {/*     <select
              value={cateId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setCateId(e.target.value);
              }}
              className="form-control form-control-sm"
            >
              <option value="">select category</option>
              {renderedCata.length > 0 &&
                renderedCata.map((eachCate) => {
                  return (
                    <option key={eachCate.value} value={eachCate.value}>
                      {eachCate.name}
                    </option>
                  );
                })}
            </select> */}

            <Select
              onChange={(value) => {
                setSelectedCateId(value!.value);
              }}
              options={renderedCata.map((eachCate) => {
                return { value: eachCate.value, label: eachCate.name };
              })}
            />
          </Col>
        </Row>

        <FileSelectDiv style={{}}>
          <Row>
            <Col>
              <p>select banner</p>
              <input
                type="file"
                name="banners"
                onChange={handleBanners}
                className="form-control form-control-sm"
                style={{ height: "50px", paddingTop: "10px" }}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <p>select product</p>
              <input
                type="file"
                name="products"
                onChange={handleProducts}
                className="form-control form-control-sm"
                style={{ height: "50px", paddingTop: "10px" }}
              />
            </Col>
          </Row>
        </FileSelectDiv>
      </Container>
    );
  };
  return (
    <>
      <Layout sidebar>
        <button onClick={handleCreatePageShow}>create pages</button>
      </Layout>

      <Modals
        show={createPageShow}
        handleClose={handleCreatePageClose}
        modalBody={createPageModalBody}
        title="Create Pages"
        buttons={[
          {
            label: "ok",
            color: "primary",
            onClick: handleCreatePageChanges,
          },
        ]}
        css={true}
      />
    </>
  );
}

const FileSelectDiv = styled.div`
  border: 1px solid lightgray;
  margin-top: 10px;
  padding: 5px 10px 10px;

  & p {
    margin: 5px 0;
  }
`;

export default Page;
