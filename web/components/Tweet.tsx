import Image from "next/image";
import React from "react";

const Tweet = ({ tweet }: any) => {
  return (
    <li
      className="text-sm leading-6 border border-4 shadow-md bg-lpink"
      style={{ borderStyle: "outset" }}
    >
      <div className="bg-gradient-to-r from-indigo-700 to-fuchsia-400 px-3">
        <h5 className="text-base text-white md:text-xl dark:text-white font-light">
          {tweet.authorUsername}
        </h5>
      </div>
      <div
        className="border border-4 shadow-md bg-gradient-to-b from-blue to-turquoise"
        style={{ borderStyle: "inset" }}
      >
        <Image
          src={tweet?.mediaUrls?.[0]?.url}
          className="border border-4 p2"
          alt=""
          title=""
          width="100%"
          height="60"
          layout="responsive"
          objectFit="contain"
        />
      </div>
      <p className="text-gray-500 text-s p-4 font-medium text-purple">
        {tweet.text}
      </p>
    </li>
  );
};
export default Tweet;
