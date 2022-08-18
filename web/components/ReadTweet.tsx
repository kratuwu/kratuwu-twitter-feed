import {
  doc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase/initFirebase";
const q = query(collection(db, "tweet"), where("query", "==", "#ミドリーズ"));
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
    <div style={{ margin: "5px 0" }}>
      {data.map((data: any) => (
        <div key={data.id}>{data.authorId}</div>
      ))}
    </div>
  );
};

export default ReadDataFromCloudFirestore;
