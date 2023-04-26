import React from "react";
import MoonIntro from "../../../assets/MoonIntro.mp4";

export default function Videoshow() {
  return (
    <video
      src={MoonIntro}
      autoPlay
      loop
      muted
      className="w-screen h-screen object-cover -z-50"
    />
  );
}
