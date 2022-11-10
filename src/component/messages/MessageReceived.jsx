import React from "react";
import "./style.css";

const MessageReceived = ({ message, date, img, sender }) => {
  return (
    <div>
      <div className="header-receiver  ">
        <div className="sub-receiver">
          <img src={img} alt="" className="img-receiver" />
        </div>
        <div className="msg-receiver">
          <small className="text-secondary">{sender}</small>
          <p className="msg">{message}</p>
          <div className="d-flex justify-content-end">
            <small
              className="text-secondary"
              style={{ position: "relative", top: "-5px" }}
            >
              {date}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageReceived;
