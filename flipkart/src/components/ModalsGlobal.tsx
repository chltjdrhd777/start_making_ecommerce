import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { onClicked } from "redux/modalSlice";
import styled from "styled-components/macro";
import Logo from "../imgs/logo.png";

interface ModalProps {
  show?: boolean;
  modalBody?: () => any;
}

function ModalsGlobal({ show, modalBody }: ModalProps) {
  const dispatch = useDispatch();

  return (
    <ModalSection show={show}>
      <ModalMainDiv>
        {modalBody && modalBody()}
        <button
          onClick={() => {
            dispatch(onClicked());
          }}
        >
          X
        </button>
      </ModalMainDiv>
      <DarkBackground
        onClick={() => {
          dispatch(onClicked());
        }}
      ></DarkBackground>
    </ModalSection>
  );
}

const ModalSection = styled.section<ModalProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${(props) => (props.show === true ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.show ? 1 : 0)};
  z-index: 999;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ModalMainDiv = styled.div`
  width: 60%;
  height: 60%;
  background-color: white;
  position: absolute;
  top: 15%;
  z-index: 998;
  border-radius: 10px;

  & > button {
    background: transparent;
    position: absolute;
    top: 0;
    width: 5%;
    right: -5%;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    outline: none;
  }
`;

const DarkBackground = styled.div<ModalProps>`
  background-color: black;
  position: fixed;
  top: 0;

  opacity: 0.5;

  width: 100%;
  height: 100%;
  z-index: 997;
`;

export default ModalsGlobal;
