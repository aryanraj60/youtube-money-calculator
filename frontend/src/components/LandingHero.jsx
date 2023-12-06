import React from "react";
import LandingForm from "./LandingForm";

const LandingHero = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-[#FFFFFF] text-5xl font-bold text-center leading-[72px]">
        Discover your earning potential
      </h3>

      <p className="text-[#FFFFFFCC] mt-5 text-2xl text-center leading-[36px] font-light">
        Turn your Youtube expertise into a lucrative income through resource
        sharing
      </p>

      <LandingForm />
    </div>
  );
};

export default LandingHero;
