import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function EditPhoto({ children }) {
  const [show, setShow] = useState(false);
  const [saveImage, setSaveImage] = useState(null);
  function handleUpload(e) {
    const uploader = e.target.files[0];
    setSaveImage(uploader);
  }
  const formData = new FormData();
  formData.append("photo", saveImage);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    handleClose();
    //  dispatch(editPhoto(idUser, formData, setEdit, handleClose));

    axios
      .put(
        process.env.REACT_APP_API_BACKEND + "/users/profile/image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert("photo update");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <>
      <h6 onClick={handleShow}>{children}</h6>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{children}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            className="form-control"
            name="photo"
            onChange={handleUpload}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPhoto;
