import React from "react";
import navLogo from "../assets/nav-img-1.svg";

const Navbar = ({ openModal }) => {
  return (
    <div className="p-4 lg:px-28 lg:py-10 flex items-center justify-between lg:pr-48">
      <div className="flex gap-3 items-center relative">
        <img src={navLogo} alt="navLogo" />

        <h3 className="text-[#FFFFFF] font-semibold text-3xl">anchors</h3>

        <p className="bg-[#CCCCCC] py-0.5 px-1.5 rounded-md absolute -top-2 -right-12 text-xs text-[#232426]">
          Beta
        </p>
      </div>

      <button
        onClick={openModal}
        className="p-2 px-4 border-[#FFFFFF80] border text-[#FFFFFF80] rounded-full"
      >
        Request a Call Back
      </button>
    </div>
  );
};

export default Navbar;
