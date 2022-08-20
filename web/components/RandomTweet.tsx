import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Tweet from "./Tweet";

const RandomTweet = (props: { tweet: DocumentData }) => {
  const [seconds, setSeconds] = useState(5);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [seconds]);
  return (
    <div className="p-20 flex justify-center">
      {seconds ? (
        <div
          className="font-bold text-center leading-14 text-hpink rounded-full bg-white flex items-center justify-center border-2 border-neutral-500"
          style={{
            height: "280px",
            width: "280px",
            fontSize: "170px",
          }}
        >
          {seconds}
        </div>
      ) : (
        <ul className="list-none">
          <Tweet tweet={props.tweet} />
        </ul>
      )}
    </div>
  );
};
export default RandomTweet;
