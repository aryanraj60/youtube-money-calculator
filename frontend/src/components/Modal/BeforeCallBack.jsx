import React, { useState } from "react";
import axios from "axios";
import { SyncLoader } from "react-spinners";

const BeforeCallBack = ({ closeModal, setIsCallBackSuccess }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mobile && name) {
      try {
        setIsLoading(true);
        const response = await axios.post("/api/callback", {
          name,
          mobile,
        });

        if (response.data.success) {
          setIsCallBackSuccess(true);
        }
      } catch (e) {
        alert("Something went wrong");
        console.log("REQUEST_CALLBACK_ERROR", e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative p-4 min-w-[480px] max-w-lg max-h-full">
      <button
        onClick={closeModal}
        type="button"
        className="absolute top-0 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close modal</span>
      </button>
      <div className="relative bg-[#282828] rounded-lg mt-5">
        <form
          onSubmit={handleSubmit}
          className="p-4 md:p-5 text-center flex flex-col gap-8 text-[#FFFFFF]"
        >
          <h3 className="text-2xl font-light">Request a call back</h3>
          <input
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className="p-3 outline-none border border-gray-400 rounded-lg bg-black/40 placeholder:text-[#707070]"
          />

          <input
            placeholder="Enter Mobile, Example - +91 8094096658"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            required
            className="p-3 outline-none border border-gray-400 rounded-lg bg-black/40 placeholder:text-[#707070]"
          />
          <button
            disabled={isLoading}
            type="submit"
            className="text-black bg-white py-4 rounded-full text-sm font-light items-center w-[80%] mx-auto"
          >
            {isLoading ? <SyncLoader size={10} /> : "Request a Call Back"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeforeCallBack;
