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
        console.log(start);
        stack[i] = data.slice(start, start + perRow);
        start += perRow;
      }
      for (let i = 0; i < portion; i++) {
        stack[i].push(data[i]);
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
                className="text-sm leading-6 rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700"
              >
                <Image
                  src={tweet.mediaUrls[0].url}
                  alt=""
                  title=""
                  width="100%"
                  height="60"
                  layout="responsive"
                  objectFit="cover"
                />
                <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                  {tweet.authorUsername}
                </h5>
                <p className="text-gray-500 text-xs">{tweet.text}</p>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ReadDataFromCloudFirestore;
