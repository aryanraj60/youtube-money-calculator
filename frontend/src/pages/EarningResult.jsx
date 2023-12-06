import React, { useEffect, useState } from "react";
import sampleVideo from "../assets/sample-video-img.svg";
import mdiPrize from "../assets/mdi_prize.svg";
import thumbUp from "../assets/thumb-up.svg";
import mdiComment from "../assets/mdi_comment.svg";
import mdiEye from "../assets/mdi_eye.svg";
import OtherVideosTable from "../components/OtherVideosTable";
import axios from "axios";
import Loader from "../components/Loader";

function formatDate(inputDate) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
}

const EarningResult = () => {
  const [userVideoData, setUserVideoData] = useState(
    JSON.parse(localStorage.getItem("userVideoData")) || {}
  );
  const [estimatedEarning, setEstimatedEarning] = useState("");
  const [similarVideos, setSimiliarVideos] = useState([]);
  const [similarChannels, setSimilarChannels] = useState([]);
  const [isSimiliarVideoLoading, setSimiliarVideoLoading] = useState(false);
  const [isEarningLoading, setEarningLoading] = useState(false);
  let snippet, statistics;

  const videoDetails = userVideoData?.items?.[0];

  // useEffect(() => {
  //   const calculateEarnings = async (channelId, views, comments, likes) => {
  //     if (channelId && views && comments && likes) {
  //       try {
  //         setEarningLoading(true);
  //         const response =
  //           await axios.get(`/api/getChannelById?channelId=${channelId}
  //                   `);

  //         if (response.data.data) {
  //           const { statistics } = response.data.data.items[0];
  //           if (statistics.hiddenSubscriberCount) {
  //             alert(
  //               "Subscriber count is hidden by the owner, Can't calculate earnings..."
  //             );
  //           } else {
  //             const subscriberCount = statistics.subscriberCount;
  //             const earnings =
  //               Math.min(subscriberCount, views) + 10 * comments + 5 * likes;

  //             setEstimatedEarning(earnings);
  //           }
  //         }
  //       } catch (e) {
  //         console.log("Channel_AXIOS_ERROR", e);
  //       } finally {
  //         setEarningLoading(false);
  //       }
  //     }
  //   };

  //   const getOtherTopVideos = async (categoryId) => {
  //     if (categoryId) {
  //       try {
  //         setSimiliarVideoLoading(true);
  //         const response = await axios.get(
  //           `/api/getVideosByCategoryId?categoryId=${categoryId}`
  //         );

  //         if (response.data.data.items.length > 0) {
  //           const videoIds = response.data.data.items.map(
  //             (item) => item.id.videoId
  //           );

  //           const channelIds = response.data.data.items.map(
  //             (item) => item.snippet.channelId
  //           );

  //           // Fetch video statistics for each video
  //           const similiarVideosResponse = await axios.get(
  //             `/api/getVideoById?videoId=${videoIds.join(",")}`
  //           );

  //           if (similiarVideosResponse.data.data.items.length > 0) {
  //             setSimiliarVideos(similiarVideosResponse.data.data.items);
  //           }

  //           // Fetch channel statistics for each channel
  //           const similiarChannels = await Promise.all(
  //             channelIds.map(async (channelId) => {
  //               const channelResponse = await axios.get(
  //                 `/api/getChannelById?channelId=${channelId}`
  //               );
  //               return channelResponse.data.data.items[0];
  //             })
  //           );

  //           if (similiarChannels.length > 0) {
  //             setSimilarChannels(similiarChannels);
  //           }
  //         }
  //       } catch (e) {
  //         console.log("Similiar_Video_Axios_ERROR", e);
  //       } finally {
  //         setSimiliarVideoLoading(false);
  //       }
  //     }
  //   };
  //   if (videoDetails) {
  //     calculateEarnings(
  //       snippet.channelId,
  //       statistics.viewCount,
  //       statistics.commentCount,
  //       statistics.likeCount
  //     );
  //     getOtherTopVideos(snippet.categoryId);
  //   }
  // }, []);

  if (videoDetails) {
    snippet = videoDetails.snippet;
    statistics = videoDetails.statistics;
  } else {
    return (
      <div className="max-w-6xl mx-auto flex justify-center text-white text-2xl">
        Something Went Wrong
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-10 bg-[#1E1E1E] rounded-lg py-5 pr-24 px-10 min-h-[266px]">
        <div className="grid grid-cols-[1.5fr_1fr] gap-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <div className="bg-[#707070] py-[4px] flex items-center gap-2 px-[8px] w-44 rounded-md text-[#FFFFFF]">
                <img src={mdiPrize} alt="mdiPrize" />
                <p>Top earner video</p>
              </div>

              <img
                src={snippet?.thumbnails?.default?.url}
                alt="ytbVideoThumbnail"
                className=""
              />

              <p className="text-[#FFFFFF80] font-light">
                Uploaded on - {formatDate(snippet?.publishedAt)}
              </p>
            </div>

            <div className="flex justify-center gap-3 flex-col">
              <h5 className="text-xl text-[#FFFFFF]">{snippet?.title}</h5>

              <div className="flex items-center gap-2 text-[#FFFFFF80] font-light">
                <img src={mdiEye} alt="eye" />
                <p>{statistics?.viewCount}</p>
              </div>
              <div className="flex items-center gap-2 text-[#FFFFFF80] font-light">
                <img src={thumbUp} alt="thumbUp" />
                <p>{statistics?.likeCount}</p>
              </div>
              <div className="flex items-center gap-2 text-[#FFFFFF80] font-light">
                <img src={mdiComment} alt="comment" />
                <p>{statistics?.commentCount}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-[#282828] flex-1 text-[#FFFFFF] rounded-xl flex justify-center py-12 h-[80%]">
              <div>
                {isEarningLoading ? (
                  <Loader />
                ) : (
                  <h4 className="text-[40px] leading-[48px]">
                    ₹ {estimatedEarning}
                  </h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex justify-center">
          <h4 className="text-[#FFFFFFB2] text-xl">Other Videos Potentials</h4>
        </div>

        <div className="mt-10 pb-6">
          {isSimiliarVideoLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <OtherVideosTable
              similarVideos={similarVideos}
              similarChannels={similarChannels}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EarningResult;
