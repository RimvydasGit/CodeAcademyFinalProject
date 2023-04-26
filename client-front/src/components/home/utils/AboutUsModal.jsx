import React from "react";
import { AiFillBackward } from "react-icons/ai";

const ModalAboutUs = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen ? (
        <div className="fixed z-10 inset-0 bg-opacity-70 backdrop-filter backdrop-blur-lg">
          <div className="flex items-center justify-center min-h-screen mx-4 md:mx-0">
            <div className="fixed inset-0"></div>
            <div className="max-w-2xl mx-auto bg-[#060f25] opacity-80 text-gray-200 rounded-lg p-8 inline-block cursor-pointer">
              <span>
                <AiFillBackward
                  className="inline-block mr-2 w-8 h-8 hover:text-amber-500"
                  onClick={onClose}
                />
              </span>

              <h2 className="text-2xl text-amber-500 mt-8 font-thin mb-8">
                About Us
              </h2>
              <p className="indent-10 max-w-md text-lg break-normal mb-8">
                At Moon, we're passionate about storytelling and bringing magic
                to our audience. Our creative team is dedicated to producing
                high-quality videos that captivate and delight, always with the
                customer's satisfaction in mind.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalAboutUs;
