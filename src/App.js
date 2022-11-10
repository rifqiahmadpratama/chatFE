import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.css";

//pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ChatList from "./pages/ChatList";

import PageDeviceNotSupported from "./pages/PageDeviceNotSupported";

// Component
import Footer from "./component/footer";
import Navbar from "./component/navbar";
import ScrollToTop from "./component/ScrollToTop";
import RequireAuth from "./component/RequireAuth";
import useWindowDimensions from "./component/WindowsSize";
//modules
import { ToastContainer } from "react-toastify";

function App() {
  let location = useLocation();

  const { height, width } = useWindowDimensions();

  return (
    <>
      <ScrollToTop>
        {width >= 576 ? (
          location.pathname === "/sign-in" ||
          location.pathname === "/chat-list" ||
          location.pathname === "/sign-up" ? null : (
            <Navbar />
          )
        ) : null}

        {width >= 576 ? (
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/chat-list" replace="true" />}
            />

            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/chat-list" element={<ChatList />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="*" element={<PageDeviceNotSupported />} />
          </Routes>
        )}
        <ToastContainer />
        {width >= 576 ? (
          location.pathname === "/sign-in" ||
          location.pathname === "/chat-list" ||
          location.pathname === "/sign-up" ? null : (
            <Footer />
          )
        ) : null}
      </ScrollToTop>
    </>
  );
}

export default App;
