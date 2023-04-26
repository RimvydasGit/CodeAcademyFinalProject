import React from "react";
import { useState, useRef } from "react";
import { IoMdQuote } from "react-icons/io";
import { BsPlayCircle } from "react-icons/bs";
import Video1 from "../../assets/Video1.mp4";
import Video2 from "../../assets/Video2.mp4";
import Video3 from "../../assets/Video3.mp4";
import Video4 from "../../assets/Video4.mp4";
import WhiteMoon from "../../assets/WhiteMoon.png";
import { BsHeartFill } from "react-icons/bs";

const VideoGallery = ({ setShowGallery, showGallery }) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const videoRef4 = useRef(null);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [isPlaying3, setIsPlaying3] = useState(false);
  const [isPlaying4, setIsPlaying4] = useState(false);

  const handlePlay1 = () => {
    const video = videoRef1.current;
    if (video.paused) {
      video.play();
      setIsPlaying1(true);
    } else {
      video.pause();
      setIsPlaying1(false);
    }
  };

  const handlePlay2 = () => {
    const video = videoRef2.current;
    if (video.paused) {
      video.play();
      setIsPlaying2(true);
    } else {
      video.pause();
      setIsPlaying2(false);
    }
  };

  const handlePlay3 = () => {
    const video = videoRef3.current;
    if (video.paused) {
      video.play();
      setIsPlaying3(true);
    } else {
      video.pause();
      setIsPlaying3(false);
    }
  };

  const handlePlay4 = () => {
    const video = videoRef4.current;
    if (video.paused) {
      video.play();
      setIsPlaying4(true);
    } else {
      video.pause();
      setIsPlaying4(false);
    }
  };
  const [likes1, setLikes1] = useState(0);
  const [likes2, setLikes2] = useState(0);
  const [likes3, setLikes3] = useState(0);
  const [likes4, setLikes4] = useState(0);
  const handleLike1 = () => {
    setLikes1(likes1 + 1);
  };

  const handleLike2 = () => {
    setLikes2(likes2 + 1);
  };
  const handleLike3 = () => {
    setLikes3(likes3 + 1);
  };

  const handleLike4 = () => {
    setLikes4(likes4 + 1);
  };

  return (
    <div className=" html min-h-screen flex flex-grow flex-col px-0 py-0 absolute max-h-screen overflow-y-auto">
      <div className="flex-1 relative px-4 my-4 text-center">
        <img
          src={WhiteMoon}
          alt="Logo"
          className="h-16 w-16"
          onClick={() => setShowGallery(!showGallery)}
        />
      </div>
      <div className="flex-1 relative px-6 text-center">
        <h2 className="transition ease-in-out delay-150 lg:my-20 md:my-18 sm:my-6 text-center lg:text-7xl md:text-5xl text-blue-100 sm:text-5xl">
          GALLERY
        </h2>
      </div>
      <div className="px-6 py-6 relative flex flex-wrap justify-center text-gray-200">
        <div className="w-full lg:w-1/2 md:w-2/3 sm:w-2/3 lg:p-4 flex flex-col justify-center items-center bg-{#060f25} h-screen">
          <p>
            <IoMdQuote className="text-gray-200 text-4xl md:text-5xl lg:text-7xl text-center mb-4" />
          </p>
          <h2 className="font-thin text-2xl md:text-4xl lg:text-4xl text-gray-200 text-center mb-4 px-8">
            We can't change the world with only ideas in our minds. We need
            conviction in our hearts.
          </h2>
          <p>MICHAEL B. JORDAN</p>
        </div>
        <div className="relative w-full lg:w-1/2 md:w-2/3 sm:w-2/3 bg-amber-500 lg:p-4 h-screen text-gray-200">
          <video
            ref={videoRef1}
            src={Video1}
            muted
            className="w-full h-full object-cover z-0 cursor-pointer"
          />
          <div className="absolute top-0 left-0 right-0 h-full flex flex-col text-end p-6">
            <h2 className="text-xl md:text-xl lg:text-xl font-bold mb-4">
              Finding the Purpose
            </h2>
            <p className="text-sm">
              Duration: 0:05<br></br>Studio: Cosmos<br></br>CM: Lina Set
              <br></br>Country: Lithuania
            </p>

            <div
              className="absolute flex bottom-6 hover:scale-95 left-6 p-4"
              onClick={handlePlay1}
            >
              <BsPlayCircle className="w-20 h-20" />
            </div>
            <div className="absolute flex bottom-6  hover:scale-95 right-6 p-4">
              <button
                className="text-gray-200 hover:text-gray-100 ml-6 bg-transparent border-none"
                onClick={handleLike1}
              >
                <BsHeartFill className="w-16 h-16 ml-5 mr-5" />
                <span>{likes1}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full lg:w-1/2 md:w-2/3 sm:w-2/3 lg:p-4 bg-gray-100 h-screen  text-gray-200">
          <video
            ref={videoRef2}
            src={Video2}
            muted
            className="w-full h-full object-cover z-0 cursor-pointer"
          />
          <div className="absolute top-0 left-0 right-0 h-full flex flex-col text-end p-6">
            <h2 className="text-xl md:text-xl lg:text-xl font-bold mb-4">
              Daydreaming
            </h2>
            <p className="text-sm">
              Duration: 0:05<br></br>Studio: CrazyShow<br></br>CM: Vilius Glav
              <br></br>Country: Lithuania
            </p>
            <div
              className="absolute bottom-6 hover:text-gray-100 hover:scale-95 left-6 p-4"
              onClick={handlePlay2}
            >
              <BsPlayCircle className="w-20 h-20" />
            </div>
            <div className="absolute flex bottom-6 hover:text-gray-100 hover:scale-95 right-6 p-4">
              <button
                className="text-gray-200 hover:text-gray-100 ml-6 bg-transparent border-none"
                onClick={handleLike2}
              >
                <BsHeartFill className="w-16 h-16 ml-5 mr-5" />
                <span>{likes2}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 md:w-2/3 sm:w-2/3 lg:p-4 flex flex-col justify-center items-center bg-[#060f25] h-screen">
          <p>
            <IoMdQuote className="text-4xl md:text-5xl lg:text-7xl text-sky-200 text-center mb-4" />
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-4xl font-thin text-gray-200 text-center mb-4 px-8">
            Innovation is rewarded. Execution is worshipped.
          </h2>
          <p>ERIC THOMAS</p>
        </div>

        <div className="w-full lg:w-1/2 md:w-2/3 sm:w-2/3 lg:p-4 flex flex-col justify-center items-center bg-[#060f25] h-screen">
          <p>
            <IoMdQuote className="text-gray-200 text-4xl md:text-5xl lg:text-7xl text-center mb-4" />
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-4xl font-thin text-gray-200 text-center mb-4 px-8">
            There's no fear when you're having fun.
          </h2>
          <p>WILL THOMAS</p>
        </div>
        <div className="relative w-full lg:w-1/2 md:w-2/3 sm:w-2/3 bg-sky-600 lg:p-4 h-screen text-gray-200">
          <video
            ref={videoRef3}
            src={Video3}
            muted
            className="w-full h-full object-cover z-0 cursor-pointer"
          />
          <div className="absolute top-0 left-0 right-0 h-full flex flex-col text-end p-6">
            <h2 className="text-xl md:text-xl lg:text-xl font-bold mb-4">
              Creating fun
            </h2>
            <p className="text-sm">
              Duration: 0:05<br></br>Studio: Cosmos<br></br>CM: Lina Set
              <br></br>Country: Lithuania
            </p>
            <div
              className="absolute bottom-6 hover:scale-95 left-6 p-4"
              onClick={handlePlay3}
            >
              <BsPlayCircle className="w-20 h-20" />
            </div>
            <div className="absolute flex bottom-6 hover:scale-95 right-6 p-4">
              <button
                className="text-gray-200 hover:text-gray-200 ml-6 bg-transparent border-none"
                onClick={handleLike3}
              >
                <BsHeartFill className="w-16 h-16 ml-5 mr-5" />
                <span>{likes3}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full lg:w-1/2 md:w-2/3 sm:w-2/3 lg:p-4 bg-neutral-600 h-screen  text-gray-200">
          <video
            ref={videoRef4}
            src={Video4}
            muted
            className="w-full h-full object-cover z-0 cursor-pointer"
          />
          <div className="absolute top-0 left-0 right-0 h-full flex flex-col text-end p-6">
            <h2 className="text-xl md:text-xl lg:text-xl font-bold mb-4">
              Admiring the beauty
            </h2>

            <p className="text-sm">
              Duration: 0:05<br></br>Studio: CrazyShow<br></br>CM: Lina
              Set@Vilius Glav
              <br></br>Country: Lithuania
            </p>

            <div
              className="absolute bottom-6 hover:scale-95 left-6 p-4"
              onClick={handlePlay4}
            >
              <BsPlayCircle className="w-20 h-20" />
            </div>
            <div className="absolute flex bottom-6 hover:scale-95 right-6 p-4">
              <button
                className="text-gray-200 hover:text-gray-200 ml-6 bg-transparent border-none"
                onClick={handleLike4}
              >
                <BsHeartFill className="w-16 h-16 ml-5 mr-5" />
                <span>{likes4}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 md:w-2/3 sm:w-2/3 lg:p-4 flex flex-col justify-center items-center bg-[#060f25] h-screen">
          <p>
            <IoMdQuote className="text-4xl md:text-5xl lg:text-7xl text-gray-200 text-center mb-4" />
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-4xl font-thin text-gray-200 text-center mb-4 px-8">
            People where you live, grow five thousand roses in one garden... yet
            they don't find what they're looking for... They don't find it.
          </h2>
          <p>LITTLE PRINCE</p>
        </div>

        <div
          className="flex justify-center items-center"
          style={{
            bottom: 0,
            left: "50%",
          }}
        >
          <p className="text-gray-100 text-xs">
            © 2023 Moon Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
export default VideoGallery;
