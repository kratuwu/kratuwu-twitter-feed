import Image from "next/image";
import React from "react";

const Tweet = ({ tweet }: any) => {
  return (
    <li className="text-sm leading-6 border border-2 border-r-neutral-500 border-b-neutral-500 p-1 bg-white ">
      <div className="bg-gradient-to-r from-indigo-700 to-fuchsia-400 px-3 mb-1">
        <h5 className="text-base text-white md:text-xl dark:text-white font-light">
          {tweet.authorUsername}
        </h5>
      </div>
      <div className="border border-2 border-l-neutral-500 border-t-neutral-500 bg-gradient-to-b from-blue to-turquoise">
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
      <div className="bg-lpink ">
        <p className="text-gray-500 text-s p-4 font-medium text-purple">
          {tweet.text}
        </p>
      </div>
    </li>
  );
};
export default Tweet;
