import type { NextPage } from "next";
import { useState } from "react";
import ReadDataFromCloudFirestore from "../components/ReadTweet";

const Home: NextPage = () => {
  const [isRandom, setIsRandom] = useState(false);
  return (
    <div>
      <main
        className="bg-[url('/img/bg.png')] no-repeat pt-10"
        style={{
          backgroundSize: "auto 100%",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <header>
          <h1 className="text-5xl text-hpink text-center text-white">
            1st FAN MEET
          </h1>
          <h2 className="text-4xl text-center leading-14">
            Yoasobi Thailand Fanclub
          </h2>
          <h4 className="text-xl font-semibold text-center leading-14 text-hpink">
            #NICETOMEETUP
          </h4>
          {isRandom || (
            <button
              className="text-2xl text-neutral-700 font-bold py-2 px-4 border border-2 border-r-neutral-500 border-b-neutral-500 p-1 bg-white"
              onClick={() => setIsRandom(true)}
            >
              Random
            </button>
          )}
        </header>
        <ReadDataFromCloudFirestore isRandom={isRandom}/>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
