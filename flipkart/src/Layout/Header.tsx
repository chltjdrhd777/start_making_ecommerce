import React, { PropsWithChildren, useState } from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { selectCategory } from "redux/mainReducer";
import { BsSearch } from "react-icons/all";
import Logo from "imgs/logo.png";

function Header(props: PropsWithChildren<{}>) {
  const { categories } = useSelector(selectCategory);

  const renderCategory = (categoryList: any[]) => {
    let renderedCategory = [];
    for (let category of categoryList) {
      renderedCategory.push(
        <li key={category._id}>
          {category.parentId ? (
            <a href={`${category.slug}?categoryId=${category._id}&type=${category.type}`}>{category.name}</a>
          ) : (
            <span>{category.name}</span>
          )}

          {category.children.length > 0 && <ul>{renderCategory(category.children)}</ul>}
        </li>
      );
    }

    return renderedCategory;
  };

  return (
    <>
      <Headerheader>
        <HeaderContainerdiv>
          <div className="logo_input_cont">
            <div className="header_logo">
              <img src={Logo} alt="" />
            </div>

            <div className="header_input">
              <input type="text" placeholder="Search what you find here" />
              <BsSearch />
            </div>
          </div>

          <div className="header_menues">
            <button>Login</button>
            <button>Login</button>
            <button>Login</button>
            <button>Login</button>
            <button>Login</button>
            <button>Login</button>
            <button>Login</button>
            <div className=""></div>
          </div>
        </HeaderContainerdiv>
      </Headerheader>
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
  background-color: #2874f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderContainerdiv = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 100%;

  & .logo_input_cont {
    display: flex;
    align-items: center;
    flex: 1;

    & .header_logo {
      width: 50px;
      height: 50px;
      overflow: hidden;

      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    & .header_input {
      height: 35px;
      background-color: white;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      width: 80%;

      & input {
        height: 100%;
        border: none;
        outline: none;
        font-size: 15px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
      }

      & svg {
        color: #2874f0;
        font-size: 20px;
      }
    }
  }
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
        background-color: #ffffff;
        left: 0;
        right: 0;
        display: none;
        border: 1px solid lightgrey;
        z-index: 999;

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
