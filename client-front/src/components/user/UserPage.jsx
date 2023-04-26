import React, { useState, useContext, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import { orderApi } from "../services/OrderApi";
import { handleLogError } from "../utils/Helpers";
import Navbar from "./Navbar";
import OrderForm from "./OrderForm";
import { AiOutlineVideoCamera } from "react-icons/ai";
import Video4 from "../../assets/Video4.mp4";
import VideoGallery from "./VideoGallery";
import { BsHeartFill } from "react-icons/bs";
import { BsPlayCircle } from "react-icons/bs";

const UserPage = () => {
  const Auth = useContext(AuthContext);
  const videoRef = useRef(null);
  const [userMe, setUserMe] = useState(null);
  const [isUser, setIsUser] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [orderDescription, setOrderDescription] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  const [likes, setLikes] = useState(0);
  const handleLike = () => {
    setLikes(likes + 1);
  };
  const [indicationBulb, setIndicationBulb] = useState("OPEN");
  const [showGallery, setShowGallery] = useState(true);

  const handleInputChange = (e, { name, value }) => {
    setOrderDescription(value);
  };

  const handleGetUserMe = () => {
    const user = Auth.getUser();

    setIsLoading(true);
    orderApi
      .getUserMe(user)
      .then((response) => {
        setUserMe(response.data);
      })
      .catch((error) => {
        handleLogError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCreateOrder = async () => {
    const user = Auth.getUser();
    let trimmedDescription = orderDescription.trim();
    if (!trimmedDescription) {
      return;
    }

    const order = { indicationBulb, description: trimmedDescription };
    await orderApi
      .createOrder(user, order)
      .then(() => {
        handleGetUserMe();
        setOrderDescription("");
        setIndicationBulb("");
      })
      .catch((error) => {
        handleLogError(error);
      });
  };

  const isUserValid = () => {
    const user = Auth.getUser();
    return user.data.role[0] === "USER";
  };

  useEffect(() => {
    setIsUser(isUserValid());
    // eslint-disable-next-line
  }, []);

  if (!isUser) {
    return <Navigate to="/" />;
  }

  return showGallery ? (
    <div className="h-screen">
      <div className="flex h-auto">
        <div className="fixed left-0 h-full w-auto flex flex-col items-center">
          <Navbar />
        </div>

        <div className="lg:px-6 lg:ml-20 md:ml-16 sm:ml-16 flex flex-wrap justify-center text-gray-200 w-full">
          <div className="w-full lg:w-1/2 md:w-2/3 sm:w-2/3 lg:p-4">
            <OrderForm
              orders={userMe && userMe.orders}
              isLoading={isLoading}
              orderDescription={orderDescription}
              handleCreateOrder={handleCreateOrder}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="w-full h-full lg:w-1/2 md:w-2/3 sm:w-2/3 lg:p-4 lg:mt-8">
            <AiOutlineVideoCamera className="text-amber-500 inline-block lg:mr-2 h-10 w-6 mb-2" />
            <h2 className="md:text-3xl sm:text-xl font-bold lg:mb-6">
              Capture the magic
            </h2>
            <p className="indent-3 block text-gray-200 lg:mb-4 md:text-md sm:text-md">
              Join us on this journey and experience the wonder of Moon. We love
              creating videos for various magic informal or formal occasions
            </p>
            <div className="relative h-auto text-gray-700">
              <video
                ref={videoRef}
                src={Video4}
                muted
                className="w-full h-auto object-cover -z-50"
              />
              <div className="absolute top-0 left-0 right-0 h-full flex flex-col text-end p-6">
                <h2 className="text-xl md:text-xl lg:text-xl font-bold mb-4">
                  Look Closer
                </h2>
                <p className="text-sm">
                  Duration: 0:10<br></br>Studio: CrazyShow<br></br>CM: Vilius
                  Glav
                  <br></br>Country: Lithuania
                </p>
                <div
                  className="absolute text-gray-100 bottom-6 hover:scale-95 left-2 p-2"
                  onClick={handlePlay}
                >
                  <BsPlayCircle className="w-16 h-16" />
                </div>
                <div className="absolute flex bottom-2 hover:scale-95 right-2 p-2">
                  <button
                    className="text-gray-200 hover:text-gray-200 ml-2 bg-transparent border-none"
                    onClick={handleLike}
                  >
                    <BsHeartFill className="w-12 h-12" />
                    <span>{likes}</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              className="lg:w-1/3 md:w-1/4 border-blue-500 bg-transparent mt-8 text-amber-500 lg:p-2 md:p-2 hover:bg-blue-500 rounded-lg lg:px-4 hover:text-gray-200"
              onClick={() => setShowGallery(!showGallery)}
            >
              Go to Video Gallery
            </button>
          </div>
        </div>
        <div
          className="flex justify-center items-center py-1 mb-0"
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <p className="text-gray-100 text-xs b-0">
            © 2023 Moon Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  ) : (
    <VideoGallery setShowGallery={setShowGallery} showGallery={showGallery} />
  );
};
export default UserPage;
