import React from "react";
import Navbar from "../components/Navbar";
import LandingHero from "../components/LandingHero";
import ytbVideoLogo from "../assets/landing-ytb-logo.svg";

const LandingPage = () => {
  return (
    <div className="">
      <div className="mt-10">
        <LandingHero />
      </div>

      <img
        src={ytbVideoLogo}
        alt="ytbVideoLogo"
        className="absolute bottom-0 right-0"
      />
    </div>
  );
};

export default LandingPage;
