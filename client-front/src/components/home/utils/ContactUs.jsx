import React from "react";
import { AuthProvider } from "../../auth/AuthContext";

function ContactUs() {
  const authProv = new AuthProvider();

  let userRole;
  try {
    userRole = authProv.getUserRole();
  } catch (error) {
    userRole = "";
  }
  let linkString = "/login";
  let linkText = "Interested? Contact us today";

  if (userRole === "USER") {
    linkString = "/user";
    linkText = "Share your vision with us";
  } else if (userRole === "ADMIN") {
    linkText = "Share your vision with us";
    linkString = "/admin";
  }

  return (
    <a
      href={linkString}
      className="z-10 block bg-slate-50 bg-opacity-20 sm:text-sm md:text-sm lg:text-lg py-2 xl:text-xl mt-10 appearance-none w-1/3 bg-grey-200 border border-gray-400 hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-50 hover:text-gray-700 hover:scale-95 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-center"
    >
      {linkText} <span aria-hidden="true">&rarr;</span>
    </a>
  );
}

export default ContactUs;
