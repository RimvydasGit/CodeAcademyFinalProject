import { useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";

function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer
      className="text-gray-300 z-10 hidden md:block fixed bottom-0 w-full cursor-pointer px-8"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`flex justify-evenly items-center ${
          isOpen ? "h-1/3" : "h-1/8"
        }`}
      >
        <div>
          <AiFillCaretUp size={24} />
          <p className="text-sm">{isOpen ? "" : ""}</p>
        </div>
      </div>

      <hr></hr>

      <div
        className={`flex justify-evenly ${
          isOpen ? "opacity-100 h-1/4" : "opacity-0 h-0"
        }`}
      >
        <div className="flex flex-col justify-center h-full">
          <p className="text-sm font-medium">Address</p>
          <p className="text-xs">123 Main St.</p>
          <p className="text-xs">Vilnius, LT 1001</p>
        </div>
        <div className="flex justify-center flex-col h-full">
          <p className="text-sm font-medium">Phone</p>
          <p className="text-xs">(123) 456-7890</p>
        </div>
        <div className="flex justify-center flex-col h-full">
          <p className="text-sm font-medium">Email</p>
          <p className="text-xs">info@moon.com</p>
        </div>
      </div>

      <div className="flex justify-center items-center py-4 h-1/8">
        <p className="text-xs">© 2023 Moon Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
