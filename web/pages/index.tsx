import type { NextPage } from "next";
import ReadDataFromCloudFirestore from "../components/ReadTweet";

const Home: NextPage = () => {
  return (
    <div>
      <main
        className="bg-[url('/img/bg.png')] no-repeat"
        style={{
          backgroundSize: "auto 100%",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <header>
          <h1 className="text-6xl text-hpink text-center text-white">
            1st FAN MEET
          </h1>
          <h2 className="text-4xl text-center leading-14">
            YOASOBI Thailand Fanclub
          </h2>
          <h2 className="text-xl font-semibold text-center leading-14 text-hpink">
            #NICETOMEETUP
          </h2>
        </header>
        <ReadDataFromCloudFirestore />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
