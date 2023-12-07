import React from "react";

const Head = "text-sm text-center px-6 py-2";
const defaultText =
  "text-sm text-center text-[#FFFFFFCC] leading-6 whitespace-nowrap px-5 py-3";

const userVideoRankText =
  "text-sm text-center text-red-600 leading-6 whitespace-nowrap px-5 py-3";

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

const OtherVideosTable = ({ similarVideos, userSubscriber, userVideoRank }) => {
  // const getVideoEarnings = (channelId, views, comments, likes) => {
  //   if (channelId) {
  //     const foundChannel = similarChannels.find(
  //       (channel) => channel.id === channelId
  //     );

  //     if (foundChannel?.statistics?.hiddenSubscriberCount) {
  //       return "hiddenSubscriberCount";
  //     } else {
  //       return calculateEarnings(
  //         foundChannel?.statistics?.subscriberCount,
  //         views,
  //         comments,
  //         likes
  //       );
  //     }
  //   }
  // };
  return (
    <div className="overflow-x-scroll overflow-hidden video-table-scrollbar relative w-full">
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

        {similarVideos?.length > 0 ? (
          <tbody className="bg-main divide-y divide-gray-800">
            {similarVideos.map((video, i) => (
              <tr key={i}>
                <td
                  // className={`${Text} ${
                  //   i === userVideoRank
                  //     ? "text-sm text-center text-red-500 leading-6 whitespace-nowrap px-5 py-3"
                  //     : "text-sm text-center text-[#FFFFFFCC] leading-6 whitespace-nowrap px-5 py-3"
                  // }`}
                  className={`${
                    i === userVideoRank ? userVideoRankText : defaultText
                  }`}
                >
                  {i + 1}
                </td>
                <td
                  className={`${
                    i === userVideoRank ? userVideoRankText : defaultText
                  } max-w-md truncate`}
                >
                  {video?.snippet?.title}
                </td>
                <td
                  className={`${
                    i === userVideoRank ? userVideoRankText : defaultText
                  } flex justify-center`}
                >
                  <div
                    className={`w-[120px] p-1 bg-dry border ${
                      i === userVideoRank ? "border-red-500" : "border-gray-500"
                    } h-[67px] rounded overflow-hidden`}
                  >
                    <img
                      src={video?.snippet?.thumbnails?.medium?.url}
                      alt={video?.snippet?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td
                  className={`${
                    i === userVideoRank ? userVideoRankText : defaultText
                  }`}
                >
                  {video?.statistics?.viewCount}
                </td>
                <td
                  className={`${
                    i === userVideoRank ? userVideoRankText : defaultText
                  }`}
                >
                  {video?.statistics?.likeCount}
                </td>
                <td
                  className={`${
                    i === userVideoRank ? userVideoRankText : defaultText
                  }`}
                >
                  {video?.statistics?.commentCount}
                </td>
                <td
                  className={`${
                    i === userVideoRank ? userVideoRankText : defaultText
                  }`}
                >
                  {formatDate(video?.snippet?.publishedAt)}
                </td>
                <td
                  className={`${
                    i === userVideoRank ? userVideoRankText : defaultText
                  }`}
                >
                  ₹{" "}
                  {calculateEarnings(
                    userSubscriber,
                    video?.statistics?.viewCount,
                    video?.statistics?.commentCount,
                    video?.statistics?.likeCount
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p>No other video found for this channel</p>
        )}
      </table>
    </div>
  );
};

export default OtherVideosTable;
