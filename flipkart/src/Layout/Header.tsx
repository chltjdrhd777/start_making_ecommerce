import React, { ChangeEvent, FormEvent, PropsWithChildren, useState } from "react";
import styled from "styled-components/macro";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory, selectModalInfo } from "redux/mainReducer";
import { BsSearch, FaShoppingCart, MdKeyboardArrowDown } from "react-icons/all";
import Logo from "imgs/logo.png";
import { loginFunc, onClicked } from "redux/modalSlice";
import { relative } from "node:path";
import ModalsGlobal from "components/ModalsGlobal";
import { Loading } from "redux/productslice";

function Header(props: PropsWithChildren<{}>) {
  const { categories } = useSelector(selectCategory);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLoginButton = () => {
    dispatch(onClicked());
  };

  const loginModalBody = () => {
    return (
      <>
        <LoginModalBody>
          <section className="right_deco">
            <div>
              <h2>Login</h2>
              <p>
                Get access to your Orders!, Whishlist and
                <br />
                Recommendations
              </p>
            </div>

            <div className="right_deco_img">
              <img src={Logo} alt="" />
            </div>
          </section>

          <form
            className="left_mainSection"
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              if (email === "" || password === "") {
                alert("you should fill the form ");
                return;
              }
              dispatch(Loading("pending"));
              dispatch(loginFunc({ email, password }));
              setEmail("");
              setPassword("");
              dispatch(Loading("finishied"));
              dispatch(onClicked());
            }}
          >
            <input
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />

            <div className="login_buttons">
              <button className="login_button">Login</button>
              <p>OR</p>
              <button className="otp_button" type="button">
                Request OTP
              </button>
            </div>
          </form>
        </LoginModalBody>
      </>
    );
  };

  const { clicked } = useSelector(selectModalInfo);

  return (
    <>
      <ModalsGlobal show={clicked} modalBody={loginModalBody} />

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
            <button onClick={handleLoginButton} className="header_login_button">
              Login
            </button>

            <button type="button" className="header_more_button">
              More
              <MdKeyboardArrowDown />
            </button>

            <Dropdown>
              <button className="dropbtn">Dropdown</button>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </Dropdown>

            <a href="/cart" className="header_menues_cart">
              <FaShoppingCart />
              cart
            </a>
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

const Dropdown = styled.button`
  position: relative;

  & .dropbtn {
    background-color: #4caf50;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
  }

  & .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 3;

    & a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      &:hover {
        background-color: #ddd;
      }
    }
  }

  &:hover {
    & .dropdown-content {
      display: block;
    }
  }
`;

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

  & .header_menues {
    display: flex;
    justify-content: space-between;
    width: 30%;
    height: 100%;
    align-items: center;

    & button {
      height: 50%;
      width: 50%;
      margin-right: 5px;
      cursor: pointer;
      &.header_login_button {
        border: none;
        color: #2874f0;
        font-size: 1.3rem;
        background: white;
        outline: none;
      }
      &.header_more_button {
        color: white;
        font-size: 1.3rem;
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        position: relative;
      }
    }

    & .header_menues_cart {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 1.3rem;

      & svg {
        text-decoration: none;
        margin: 0 10px;
      }
    }
  }
`;

const LoginModalBody = styled.div`
  display: flex;
  height: 100%;

  & .right_deco {
    flex: 0.37;
    background-color: #2874f0;
    box-sizing: border-box;
    padding: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > p {
      margin-top: 10px;
    }

    & .right_deco_img {
      text-align: center;
      height: 60%;

      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  & .left_mainSection {
    flex: 0.63;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;

    & input {
      border: none;
      border-bottom: 2px solid #2874f0;
      margin-bottom: 30px;
      outline: none;
      font-size: 1rem;
      &::-webkit-input-placeholder {
        color: #6563bd;
      }
    }

    & .login_buttons {
      display: flex;
      flex-direction: column;
      text-align: center;
      box-sizing: border-box;
      padding: 10px;
      height: 80%;

      & p {
        margin: 2rem 0;
      }

      & button {
        height: 15%;
        border: none;
        border-radius: 3px;
        font-size: 1rem;
        font-weight: bold;
        color: white;
        cursor: pointer;
        transition: all 0.1s ease-in;
        outline: none;
        &.login_button {
          background-color: #7ed5f0;

          &:hover {
            background: #617db3;
          }
        }

        &.otp_button {
          background-color: white;
          box-shadow: 0px 5px 10px -5px lightgray;
          color: #87afee;

          &:hover {
            transform: translateY(-3px);
          }
          &:active {
            transform: translateY(3px);
          }
        }
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
