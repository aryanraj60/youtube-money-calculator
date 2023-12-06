import React from "react";

const Head = "text-sm text-center px-6 py-2";
const Text =
  "text-sm text-center leading-6 text-[#FFFFFFCC] whitespace-nowrap px-5 py-3";

function formatDate(inputDate) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
}

const calculateEarnings = (subscriberCount, views, comments, likes) => {
  if (subscriberCount && views && comments && likes) {
    const earnings =
      Math.min(subscriberCount, views) + 10 * comments + 5 * likes;

    return earnings;
  } else {
    return "No Result";
  }
};

const OtherVideosTable = ({ similarVideos, similarChannels }) => {
  const getVideoEarnings = (channelId, views, comments, likes) => {
    if (channelId) {
      const foundChannel = similarChannels.find(
        (channel) => channel.id === channelId
      );

      if (foundChannel?.statistics?.hiddenSubscriberCount) {
        return "hiddenSubscriberCount";
      } else {
        return calculateEarnings(
          foundChannel?.statistics?.subscriberCount,
          views,
          comments,
          likes
        );
      }
    }
  };
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full tabel-auto">
        <thead className="text-[#FFFFFF] bg-[#1E1E1E] h-20">
          <tr className="">
            <th scope="col" className={`${Head}`}>
              Rank
            </th>
            <th scope="col" className={`${Head}`}>
              Title
            </th>
            <th scope="col" className={`${Head}`}>
              Thumbnail
            </th>
            <th scope="col" className={`${Head}`}>
              Views
            </th>
            <th scope="col" className={`${Head}`}>
              Likes
            </th>
            <th scope="col" className={`${Head}`}>
              Comments
            </th>
            <th scope="col" className={`${Head}`}>
              Uploaded On
            </th>
            <th scope="col" className={`${Head}`}>
              *Estimated Earning
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {similarVideos?.length > 0 &&
            similarVideos.map((video, i) => (
              <tr key={i}>
                {/* <td className={`${Text}`}>
            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
              <img
                src={movie?.titleImg}
                alt={movie?.title}
                className="w-full h-full object-cover"
              />
            </div>
          </td> */}
                <td className={`${Text}`}>{i + 1}</td>
                <td className={`${Text} max-w-md truncate`}>
                  {video?.snippet?.title}
                </td>
                <td className={`${Text} flex justify-center`}>
                  <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                    <img
                      src={video?.snippet?.thumbnails?.default?.url}
                      alt={video?.snippet?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className={`${Text}`}>{video?.statistics?.viewCount}</td>
                <td className={`${Text}`}>{video?.statistics?.likeCount}</td>
                <td className={`${Text}`}>{video?.statistics?.commentCount}</td>
                <td className={`${Text}`}>
                  {formatDate(video?.snippet?.publishedAt)}
                </td>
                <td className={`${Text}`}>
                  ₹{" "}
                  {getVideoEarnings(
                    video?.snippet?.channelId,
                    video?.statistics?.viewCount,
                    video?.statistics?.commentCount,
                    video?.statistics?.likeCount
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OtherVideosTable;
