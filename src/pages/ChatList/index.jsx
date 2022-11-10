import React, { useState, useEffect, Fragment } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
//import { BsSearch } from "react-icons/bs";
import Swal from "sweetalert2";
import EditPhoto from "../../modals/edit-photo/index";
import EditName from "../../modals/edit-name/EditName";
import EditNumber from "../../modals/edit-number/EditNumber";
import EditGender from "../../modals/edit-gender/EditGender";
import EditBio from "../../modals/edit-bio/EditBio";
import { io } from "socket.io-client";
import { MdLogout } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import Chat from "../../component/chat";
import ImageBack from "../../assets/images/back.png";
import ImageBack1 from "../../assets/images/back1.png";
import ImageBel from "../../assets/images/bel.png";
import profileImage from "../../assets/images/rifqi.png";
import moment from "moment";
import MessageReceived from "../../component/messages/MessageReceived";
import MessageSender from "../../component/messages/MessageSender";

const ChatList = () => {
  const [isEdit, setIsEdit] = useState(false);
  const senderID = localStorage.getItem("id");
  const senderName = localStorage.getItem("name");
  const isAuth = localStorage.getItem("token");
  const DataReceiver = JSON.parse(localStorage.getItem("receiver"));
  const myID = localStorage.getItem("id");
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const [activeMessage, setActiveMessage] = useState(false);
  const [tab, setTab] = useState("");
  const [message, setMessage] = useState("");
  const [DataChat, SetDataChat] = useState([]);
  const [DataProfile, SetDataProfile] = useState();
  const [socketio, setSocketio] = useState(null);
  const [listChat, setListChat] = useState([]);
  // const handleUpdate = async (e) => {
  //   await e.preventDefault();
  //   const token = localStorage.getItem("token");
  //   axios
  //     .put("http://localhost:3200/users/profile", JSON.stringify(dataUser), {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "multipart/form-data",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       alert("product update");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert(err);
  //     });
  // };
  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:3200/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          },
        });

        const dataNew = response.data.data.filter(
          (person) => person.id !== myID
        );

        return SetDataChat(dataNew);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
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

  const toProfile = () => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };
  console.log("Cek List Chat = ", listChat);
  const onSubmitMessage = (e) => {
    e.preventDefault();

    // const sendMessage = {
    //   sender: senderID,
    //   senderName: senderName,
    //   receiver: DataReceiver.id,
    //   message,
    // };
    // socketio.emit("send-message", sendMessage);

    let payload = {
      sender: senderID,
      senderName: senderName,
      receiver: DataReceiver.id,
      receiverName: DataReceiver.name,
      message,
    };
    setListChat([...listChat, payload]);

    if (message !== "") {
      const data = {
        sender: senderID,
        receiver: DataReceiver.id,
        name: DataReceiver.name,
        photo: DataReceiver?.photo,
        message,
      };
      socketio.emit("send-message", data);
    }
    setMessage("");
  };

  useEffect(() => {
    fetchPost();
    profiledata();
    const socket = io("http://localhost:3200");
    socket.on("new-message", (data) => {
      console.log("cek data masuk = ", data);
      setListChat((current) => [...current, data]);
    });
    setSocketio(socket);
  }, []);

  // useEffect(() => {
  //   if (socketio) {
  //     socketio.on("new-message", (data) => {
  //       console.log("cek message kiriman = ", data);
  //       setListChat((current) => [...current, data]);
  //     });
  //   }
  // }, [socketio]);

  const handlelogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be Logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        return navigate("/sign-in");
      }

      return 0;
    });
  };

  const selectReceiver = (e) => {
    // setListChat([]);
    // setActiveReceiver(e);
    const profileID = localStorage.getItem("id");

    socketio.emit("join-room", profileID);

    setActiveMessage(true);
    localStorage.setItem("receiver", JSON.stringify(e));
  };
  useEffect(() => {
    setTab("");
    if (queryParams.get("tab")) {
      setTab(queryParams.get("tab"));
    }
  }, [queryParams]);

  return (
    <Fragment>
      {isAuth ? (
        <div className="chat-list-page">
          <div className="row">
            <div className="card col-4 ">
              {isEdit ? (
                <div className="card-body">
                  <div className="d-flex">
                    <img
                      width={30}
                      height={30}
                      src={ImageBack}
                      alt="ImageBack"
                      onClick={toProfile}
                      type="button"
                    />
                    <h5 className="ms-3">{DataProfile.name}</h5>
                  </div>
                  <div className="text-center">
                    <EditPhoto>
                      <div>
                        <img
                          className="profile-rounded pointer"
                          src={
                            DataProfile?.photo
                              ? DataProfile?.photo
                              : profileImage
                          }
                          alt="avatar"
                          width="100px"
                          style={{ cursor: "pointer", borderRadius: "50%" }}
                          height="100px"
                        />
                      </div>
                    </EditPhoto>
                    <EditName>
                      <div className="profile-rounded pointer">
                        <h3>{DataProfile?.name}</h3>
                      </div>
                    </EditName>
                  </div>
                  <h3>Contact</h3>
                  <EditNumber>
                    <div className="profile-rounded pointer">
                      <p>{DataProfile.phone}</p>
                    </div>
                  </EditNumber>

                  <h3>Gender</h3>
                  <EditGender>
                    <div className="profile-rounded pointer">
                      <p>{DataProfile.gender}</p>
                    </div>
                  </EditGender>

                  <hr />
                  <p>Bio</p>
                  <EditBio>
                    <div className="profile-rounded pointer">
                      <p>{DataProfile.bio}</p>
                    </div>
                  </EditBio>

                  {/* <h3>Settings</h3>
                  <div class="row align-items-start">
                    <div class="col-1">
                      <img src={ImageBel} alt="ImageBel" />
                    </div>
                    <div class="col-9 ms-1">Notification and Sounds</div>
                    <div class="col-1">
                      <img src={ImageBack1} alt="ImageBack" />
                    </div>
                  </div> */}
                </div>
              ) : (
                <div className="card-body">
                  <div className="row">
                    <div className="col-auto me-auto">
                      <h3>Telegram</h3>
                    </div>
                    <div className="col-auto">
                      <div className="dropdown">
                        <div
                          role="button"
                          id="dropdownMenuLink"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <div className="hamburger-item" />
                          <div
                            className="hamburger-item"
                            style={{ width: "25px" }}
                          />
                          <div className="hamburger-item" />
                        </div>
                        <ul
                          className="dropdown-menu mt-2"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <li>
                            <Link
                              onClick={toProfile}
                              type="button"
                              className="dropdown-item my-3 text-white"
                            >
                              <div className="d-flex">
                                <h5>
                                  <AiOutlineUser />
                                </h5>
                                <p className="ms-2 mt-1 p-0 m-0">Profile</p>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="dropdown-item my-3 text-white"
                              onClick={handlelogout}
                            >
                              <div className="d-flex">
                                <h5>
                                  <MdLogout />
                                </h5>
                                <p className="ms-2 mt-1 p-0 m-0">Logout</p>
                              </div>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <Form
                    // onSubmit={handleSearchSubmit}
                    className="form-search d-flex mt-3"
                  >
                    <div className="col-11 d-flex border border-1 rounded-pill form-input">
                      <input
                        className="form-control rounded-pill border-0 "
                        id="input-search"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        // onChange={handleSearch}
                      />
                      <Button
                        onClick={() => {
                          // navigate("../recipes?" + searchParams);
                          // toggleOffcanvas();
                        }}
                        className="bg-transparent border-0 rounded-pill btn-search"
                        type="submit"
                      >
                        <img
                          className=""
                          src={
                            require("../../assets/images/icons/search.svg")
                              .default
                          }
                          alt="search"
                        />
                      </Button>
                    </div>
                    <div className="col-1">
                      <img
                        className="img-thumbnail mt-1 ms-1"
                        src={
                          require("../../assets/images/icons/plus.svg").default
                        }
                        alt="plus"
                      />
                    </div>
                  </Form>
                  <div className="select-chat mt-3">
                    <ul
                      className="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-home-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          All
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-profile-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-profile"
                          type="button"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                        >
                          Important
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-contact-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-contact"
                          type="button"
                          role="tab"
                          aria-controls="pills-contact"
                          aria-selected="false"
                        >
                          Unread
                        </button>
                      </li>
                      <hr />
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                        tabIndex="0"
                      >
                        All name
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                        tabIndex="0"
                      >
                        <nav>
                          <div
                            className="nav nav-tabs chat-menu-message"
                            id="nav-tab"
                            role="tablist"
                          >
                            {DataChat.map((item) => (
                              <div key={item.id}>
                                <div
                                  onClick={() => selectReceiver(item)}
                                  className="friend-chat d-flex nav-link col-12"
                                  id={item.id + "-tab"}
                                  data-bs-toggle="pill"
                                  data-bs-target={"#" + item.id}
                                  type="button"
                                  role="tab"
                                  aria-controls={item.id}
                                >
                                  <img
                                    className="profile-rounded pointer"
                                    src={
                                      item?.photo ? item?.photo : profileImage
                                    }
                                    alt="plus"
                                  />
                                  <div className="ms-2">
                                    <p>
                                      <b>{item.name}</b>
                                    </p>
                                    <p>Sedang Ngapain woy??</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </nav>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-contact"
                        role="tabpanel"
                        aria-labelledby="pills-contact-tab"
                        tabIndex="0"
                      >
                        Contact
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-disabled"
                        role="tabpanel"
                        aria-labelledby="pills-disabled-tab"
                        tabIndex="0"
                      >
                        ...
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className=" card col-8">
              <div className="card-body">
                {!activeMessage ? (
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <p>Please select a chat to start messaging</p>
                  </div>
                ) : (
                  <div className="page-message">
                    <div
                      className="text-center"
                      data-bs-spy="scroll"
                      data-bs-target="#simple-list-example"
                      data-bs-offset="0"
                      data-bs-smooth-scroll="true"
                      tabIndex="0"
                    ></div>
                    <div className="chat-menu col-12 d-flex flex-column justify-content-between">
                      <div className="chat-menu-header bg-white py-1 px-1">
                        <div className="d-flex">
                          <img
                            className="profile-rounded pointer"
                            src={
                              DataReceiver?.photo
                                ? DataReceiver?.photo
                                : profileImage
                            }
                            alt="profile"
                          />

                          <div className="ms-3 pointer">
                            <p className="fw-bold m-0 p-0">
                              {DataReceiver.name}
                            </p>
                            <p className="fw-bold color-blue m-0 p-0">
                              <small>Online</small>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="chat-menu-messages p-3 border border-1 "
                        id="chatMenuMessage"
                      >
                        <div className="list-chats">
                          {listChat.map((item, index) => (
                            <div key={index}>
                              <div>
                                {item.sender === senderID ? (
                                  <MessageSender
                                    date={moment(item.created_at).format("LT")}
                                    message={item.message}
                                  />
                                ) : (
                                  <>
                                    <MessageReceived
                                      date={moment(item.created_at).format(
                                        "LT"
                                      )}
                                      // sender={DataReceiver.name}
                                      message={item.message}
                                      img={
                                        item.photo
                                          ? item.photo
                                          : DataReceiver.photo
                                      }
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="chat-menu-form bg-white py-4">
                        <form onSubmit={onSubmitMessage}>
                          <div className="input-group">
                            <input
                              className="form-control bg-light border-0"
                              id="message"
                              placeholder="Type your message"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary">
                              Send
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="mt-5">Harap login dulu gaes</h1>
          <Link className="text-warning text-decoration-none" to={"../sign-in"}>
            <button type="button" class="btn btn-primary">
              Login
            </button>
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default ChatList;
