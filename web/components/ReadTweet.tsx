import {
  collection,
  onSnapshot,
  query,
  DocumentData,
  orderBy,
} from "firebase/firestore";
import { SetStateAction, useEffect, useState } from "react";
import { db } from "../utils/firebase/initFirebase";
import RandomTweet from "./RandomTweet";
import Tweet from "./Tweet";
const q = query(collection(db, "tweet"), orderBy("createdAt", "desc"));
const ReadDataFromCloudFirestore = (props: { isRandom: boolean }) => {
  const [data, setData] = useState<DocumentData[][]>([]);
  const [randomTweet, setRandomTweet] = useState<DocumentData>({});
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => doc.data());
      const stack: SetStateAction<DocumentData[][]> = [[], [], []];
      let current = 0;
      data.forEach((tweet) => {
        stack[current].push(tweet);
        current = (current + 1) % 3;
      });
      setData(stack);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const allTweets = data.flatMap((group) => group);
    setRandomTweet(allTweets[Math.floor(Math.random() * allTweets.length)]);
  }, [props.isRandom]);
  return props.isRandom ? (
    <RandomTweet tweet={randomTweet} />
  ) : (
    <div className="px-10 py-6">
      <div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((group, i) => (
          <ul key={i + "list"} className="space-y-8">
            {group.map((tweet) => (
              <Tweet tweet={tweet} key={tweet.id} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ReadDataFromCloudFirestore;
