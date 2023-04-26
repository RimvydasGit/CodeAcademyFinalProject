import React from "react";
import Navbar from "./utils/Navbar";
import Videoshow from "./utils/VideoshowBackground ";
import LandingPageBody from "./utils/LandingPageBody";
import Footer from "./utils/Footer";

function Home() {
  return (
    <>
      <div className="flex-wrap h-screen w-screen center center flex-col">
        <Videoshow />
        <div className="flex-wrap h-auto w-screen grow flex-row">
          <div className="flex-wrap w-32 break-all">
            <Navbar />
          </div>
          <div className="grid grid-rows-2 gap-0">
            <div className="flex-wrap">
              <LandingPageBody />
            </div>
          </div>
        </div>
        <div className="flex-wrap w-screen">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
