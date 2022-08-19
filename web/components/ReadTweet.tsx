import {
  collection,
  onSnapshot,
  query,
  DocumentData,
  orderBy,
} from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase/initFirebase";
const q = query(collection(db, "tweet"), orderBy("createdAt", "desc"));
const ReadDataFromCloudFirestore = () => {
  const [data, setData] = useState<DocumentData[][]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => doc.data());
      const portion = data.length % 3;
      const perRow = Math.floor(data.length / 3);
      const stack = [];
      let start = 0;
      for (let i = 0; i < 3; i++) {
        stack[i] = data.slice(start, start + perRow);
        start += perRow;
      }
      for (let i = 0; i < portion; i++) {
        stack[i].push(data[start]);
        start++;
      }
      setData(stack);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ margin: "5px 0" }} className="p-10">
      <div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((group, i) => (
          <ul key={i + "list"} className="space-y-8">
            {group.map((tweet) => (
              <li
                key={tweet.id}
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
                    src={tweet.mediaUrls[0].url}
                    className="border border-4 p2"
                    alt=""
                    title=""
                    width="100%"
                    height="60"
                    layout="responsive"
                    objectFit="contain"
                  />
                </div>
                <p className="text-gray-500 text-xs p-4 text-purple">
                  {tweet.text}
                </p>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ReadDataFromCloudFirestore;
