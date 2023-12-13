import React from "react";
import navLogo from "../assets/nav-img-1.svg";
import phoneIcon from "../assets/PhoneIcon.png";
import { Link } from "react-router-dom";

const Navbar = ({ openModal }) => {
  return (
    <div className="p-4 lg:px-28 lg:py-8 flex items-center justify-between lg:pr-48">
      <Link to="/" className="flex gap-3 items-center relative">
        <img src={navLogo} alt="navLogo" />

        <h3 className="text-[#FFFFFF] font-semibold text-3xl">ProfitPulse</h3>

        <p className="bg-[#CCCCCC] py-0.5 px-1.5 rounded-md absolute -top-2 -right-12 text-xs text-[#232426]">
          Beta
        </p>
      </Link>

      <button
        onClick={openModal}
        className="py-1.5 px-4 flex gap-2 items-center border-[#FFFFFF80] border text-[#FFFFFF80] rounded-full"
      >
        <img src={phoneIcon} alt="phoneIcon" className="h-4" />
        <p className="text-lg">Request a Call Back</p>
      </button>
    </div>
  );
};

export default Navbar;
