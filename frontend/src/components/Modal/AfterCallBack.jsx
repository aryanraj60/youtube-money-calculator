import React from "react";
import RightVector from "../../assets/Right-Vector.svg";

import { useNavigate } from "react-router-dom";

const AfterCallBack = ({ closeModal, setIsCallBackSuccess }) => {
  const navigate = useNavigate();

  return (
    <div className="relative p-4 min-w-[480px] max-w-lg max-h-full">
      <div className="relative bg-[#282828] rounded-lg">
        <button
          onClick={() => {
            setIsCallBackSuccess(false);
            closeModal();
          }}
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5 text-center flex flex-col gap-4">
          <div className="flex justify-center">
            <img src={RightVector} alt="rightVector" />
          </div>
          <h3 className="text-2xl font-[500] text-[#FFFFFF]">
            Request a call back
          </h3>
          <p className="mb-5 text-sm font-light text-[#FFFFFFCC]">
            Our Team will call you shortly in 12-24 hrs
          </p>
          <p className="mb-5 text-sm font-light text-[#FFFFFFCC]">
            Can’t you wait for call?
          </p>
          <button
            onClick={() => {
              closeModal();
              navigate("/");
            }}
            className="text-white bg-[#FF0000] py-4 rounded-full text-sm font-light items-center w-full"
          >
            Check another video
          </button>
        </div>
      </div>
    </div>
  );
};

export default AfterCallBack;
