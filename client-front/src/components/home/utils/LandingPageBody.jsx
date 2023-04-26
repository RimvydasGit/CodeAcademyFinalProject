import React from "react";
import ContactUs from "./ContactUs";

const LandingPageBody = () => {
  return (
    <div
      className="z-10 absolute flex h-auto flex-col justify-center items-center w-full text-gray-300"
      style={{ top: "20%" }}
    >
      <pre className="text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold text-center">
        <span className="block transform -rotate-3">Imagine</span>
        <span className="block transform">the Moon</span>
      </pre>
      <p className="hidden sm:block text-center lg:text-md md:text-sm leading-8 text-gray-200 break-normal">
        Welcome to our world of magic videos!<br></br> Brighten up any occasion
        with our enchanting video designs.<br></br>Let us create magic for you!
      </p>
      <ContactUs />
    </div>
  );
};
export default LandingPageBody;
