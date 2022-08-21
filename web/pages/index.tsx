import type { NextPage } from "next";
import { useState } from "react";
import RandomButton from "../components/RandomButton";
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
          <div className="flex justify-center">
            <p className="text-xl font-semibold text-center leading-14 text-hpink mx-5">
              #YOASOBITH
            </p>
            <p className="text-xl font-semibold text-center leading-14 text-fuchsia-400 mx-5">
              #NICETOMEETUP
            </p>
          </div>
        </header>
        <ReadDataFromCloudFirestore isRandom={isRandom} />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
