import {
  collection,
  onSnapshot,
  query,
  DocumentData,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase/initFirebase";
const q = query(collection(db, "tweet"), orderBy("createdAt"));
const ReadDataFromCloudFirestore = () => {
  const [data, setData] = useState<DocumentData[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setData(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ margin: "5px 0" }} className="p-10">
      <div className="flex flex-wrap">
        {data.map((data) => (
          <div key={data.id} className="w-1/4 mb-10">
            <div className="font-bold text-xl mb-2">{data.authorUsername}</div>
            <p className="text-gray-700 text-base">{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadDataFromCloudFirestore;
