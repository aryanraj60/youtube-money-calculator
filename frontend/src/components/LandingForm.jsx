import React, { useState, useEffect } from "react";
import ytbVector from "../assets/ytb-vector.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Progress } from "@material-tailwind/react";

const LandingForm = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (videoUrl) {
      try {
        const videoId = videoUrl.split("v=")[1];

        if (videoId) {
          setIsLoading(true);

          await new Promise((resolve, reject) => setTimeout(resolve, 500));
          const response = await axios.get(
            `/api/getVideoById?videoId=${videoId}`
          );

          if (response.data.data) {
            localStorage.setItem(
              "userVideoData",
              JSON.stringify(response.data.data)
            );
            setTimeout(() => {
              navigate("/earning-result");
            }, 500);
          }
        } else {
          alert("Please enter a valid video url...");
        }
      } catch (err) {
        console.log("AXIOS_LANDING_FORM_ERROR", err);
        alert("Failed to retrieve video details...");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please enter a valid video url...");
    }
  };

  useEffect(() => {
    if (isLoading) {
      const progressInterval = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev < 100) {
            return prev + 10;
          } else {
            clearInterval(progressInterval);
            return 100;
          }
        });
      }, 100);
    }
  }, [isLoading]);
  return (
    <div className="mt-16">
      <form onSubmit={handleSubmit} className="flex items-center gap-6">
        <div className="flex flex-1 gap-3 items-center border border-[#FFFFFF80] rounded-xl py-3 px-[39px]">
          <img src={ytbVector} alt="ytbVector" />

          <input
            placeholder="enter youtube video link"
            onChange={(e) => setVideoUrl(e.target.value)}
            value={videoUrl}
            className="bg-transparent outline-none w-full text-[#FFFFFF] placeholder:text-[#373737] placeholder:text-base placeholder:font-light"
          />
        </div>

        <button
          type="submit"
          className="py-3 px-16 bg-[#FF2020] text-slate-200 rounded-full"
        >
          Go
        </button>
      </form>

      {isLoading && (
        <div className="mt-5">
          <Progress
            value={progressPercent}
            label="Completed"
            color="red"
            className="bg-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default LandingForm;
