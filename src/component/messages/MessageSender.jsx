import React from "react";
import "./style.css";

const MessageSender = ({ message, date }) => {
  return (
    <div className="header-sender ">
      <div className="sub-sender">
        <div className="contend-msg">
          <p className="msg">{message}</p>
          <div className="d-flex justify-content-end">
            <small style={{ position: "relative", top: "-5px" }}>{date}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSender;
