import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface PropType {
  show: any;
  handleChanges: any;
  handleClose: any;
  modalBody: any;
  title?: string;
  closeMeessage?: string;
  saveMessage?: string;
  size?: "sm" | "lg" | "xl";
}

function Modals({ show, handleChanges, handleClose, modalBody, title, closeMeessage, saveMessage, size }: PropType) {
  return (
    <Modal show={show} onHide={handleClose} animation={true} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody()}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {closeMeessage ? closeMeessage : "Close"}
        </Button>
        <Button variant="primary" onClick={handleChanges}>
          {saveMessage ? saveMessage : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modals;
