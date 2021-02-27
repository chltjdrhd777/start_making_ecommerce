import React, { PropsWithChildren } from "react";
import styled from "styled-components/macro";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory } from "redux/mainReducer";

function Header(props: PropsWithChildren<{}>) {
  const { categories } = useSelector(selectCategory);
  const renderCategory = (categoryList: any[]) => {
    let renderedCategory = [];
    for (let category of categoryList) {
      renderedCategory.push(
        <li key={category._id}>
          {category.parentId ? <a href={category.slug}>{category.name}</a> : <span>{category.name}</span>}

          {category.children.length > 0 && <ul>{renderCategory(category.children)}</ul>}
        </li>
      );
    }

    return renderedCategory;
  };

  return (
    <>
      <Headerheader>header</Headerheader>
      <SubMenueNav>
        <ul>{categories.categoryList !== undefined && categories.categoryList.length > 0 && renderCategory(categories.categoryList)}</ul>
      </SubMenueNav>
      {props.children}
    </>
  );
}

const Headerheader = styled.header`
  width: 100%;
  height: 70px;
  background-color: #a8c9ff;
`;

//article = menuheader
const SubMenueNav = styled.nav`
  width: 100%;
  height: 40px;
  background-color: white;
  border-bottom: 1px solid #cecece;
  box-shadow: 0 2px 2px -2px #333;

  & > ul {
    display: flex;
    margin: 0 50px;
    position: relative;

    //* li = > each menue
    & > li {
      &:hover > ul {
        display: block;
      }
      //* span = head title
      & > span {
        display: block;
        line-height: 40px;
        padding: 0 20px;
        cursor: pointer;
        font-size: 14px;
        &:hover {
          color: #80aaee;
        }
      }

      //* ul = children container
      & > ul {
        position: absolute;
        background-color: #f8ffff;
        left: 0;
        right: 0;
        display: none;
        border: 1px solid lightgrey;

        //* li = children's list
        & > li {
          margin: 0 20px;
          float: left;
          min-width: 200px;

          //* 1. a = each childrens' title
          & a {
            display: block;
            padding: 5px 0;
            color: #37353a;
          }

          & > a {
            font-weight: bold;
            font-size: 1rem;
          }

          //* 2. ul = children's children container
          & > ul {
          }
        }
      }
    }
  }
`;

export default Header;
