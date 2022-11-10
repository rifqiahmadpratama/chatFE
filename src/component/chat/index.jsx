/* eslint-disable react/prop-types */
import React, { useState, Fragment, useEffect } from "react";
import moment from "moment";

import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";
import imageProfile from "../../assets/images/salimImage.png";

export default function Chat() {
  return (
    <Fragment>
      <div className="chat-menu col-12 d-flex flex-column justify-content-between">
        <div className="chat-menu-header bg-white py-1 px-1">
          <div className="d-flex">
            <img
              className="profile-rounded pointer"
              src={imageProfile}
              alt="profile"
            />

            <div className="ms-3 pointer">
              <p className="fw-bold m-0 p-0">Abdus Salim</p>
              <p className="fw-bold color-blue m-0 p-0">
                <small>Online</small>
              </p>
            </div>
          </div>
        </div>
        <div className="chat-menu-message p-4" id="chatMenuMessage">
          <p className="mt-5">wkwk</p>
          <p className="mt-5">wkwk</p>
          <p className="mt-5">wkwk</p>
          <p className="mt-5">wkwk</p>
          <p className="mt-5">wkwk</p>
          <p className="mt-5">wkwk</p>
          <p className="mt-5">wkwk</p>
          <p className="mt-5">wkwk</p>
          <p className="mt-5">wkwk</p>
          <p className="mt-5">wkwk</p>
          <p className="mt-5">wkwk</p>
          <p className="mt-5">wkwk</p>
          <p className="mt-5">wkwk</p>
        </div>
        <div className="chat-menu-form bg-white py-4">
          <form
          // onSubmit={onSendMessage}
          >
            <div className="input-group">
              <input
                className="form-control bg-light border-0"
                id="message"
                placeholder="Type your message"
                //  value={message}
                //  onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
