import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function EditName({ children }) {
  const [show, setShow] = useState(false);
  const [DataProfile, SetDataProfile] = useState([]);
  const [data, setData] = useState({
    name: "",
    gender: "",
    phone: "",
    date_of_birth: "",
    bio: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setData({
      [e.target.name]: e.target.value,
      name: DataProfile.name,
      gender: DataProfile.gender,
      phone: DataProfile.phone,
    });
  };

  const profiledata = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          "http://localhost:3200/users/profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            },
          }
        );

        return SetDataProfile(response.data.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  console.log("CEk data yang di ketik = ", data);
  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    handleClose();
    axios
      .put("http://localhost:3200/users/profile/", JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        },
      })
      .then((res) => {
        console.log(res);
        alert("name update");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    profiledata();
  }, []);
  console.log("cek data", DataProfile.name);
  return (
    <>
      <h6 onClick={handleShow}>{children}</h6>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            name="bio"
            defaultValue={DataProfile.bio}
            onChange={handleChange}
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

export default EditName;
