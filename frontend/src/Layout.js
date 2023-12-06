import React from "react";
import Navbar from "./components/Navbar";
import Modal from "react-modal";

import BeforeCallBack from "./components/Modal/BeforeCallBack";
import AfterCallBack from "./components/Modal/AfterCallBack";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#282828",
  },
  overlay: {
    backgroundColor: "#FFFFFF33",
  },
};

Modal.setAppElement("#root");

const Layout = ({ children }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isCallBackSuccess, setIsCallBackSuccess] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#101010] relative">
      <Navbar openModal={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {/* {isCallBackSuccess ? (
          <AfterCallBack
            closeModal={closeModal}
            setIsCallBackSuccess={setIsCallBackSuccess}
          />
        ) : (
          <BeforeCallBack
            setIsCallBackSuccess={setIsCallBackSuccess}
            closeModal={closeModal}
          />
        )} */}
        <AfterCallBack
          closeModal={closeModal}
          setIsCallBackSuccess={setIsCallBackSuccess}
        />
      </Modal>

      <div>{children}</div>
    </div>
  );
};

export default Layout;
