import Image from "next/image";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className=" py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center flex flex-col justify-center items-center border-b border-gray-300 mb-4">
          <Image src="/assets/logo.svg" alt="Logo" width={109} height={100} />
          <p className="my-2 text-sm text-lightergrey pt-4">
            Connect with us on
          </p>
        </div>
        <div className="flex justify-center items-center space-x-10 mb-4  pb-4">
          <a
            href="#"
            aria-label="Facebook"
            className="text-primary hover:text-gray-700"
          >
            <FaFacebookF className="text-2xl" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-primary hover:text-gray-700"
          >
            <FaTwitter className="text-2xl" />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-primary hover:text-gray-700"
          >
            <FaInstagram className="text-2xl" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="text-primary hover:text-gray-700"
          >
            <FaLinkedinIn className="text-2xl" />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="text-primary hover:text-gray-700"
          >
            <FaYoutube className="text-2xl" />
          </a>
        </div>
        <div className="text-center flex gap-2 justify-center items-center ">
          <Image src="/assets/logo.svg" alt="Logo" width={109} height={100} />
          <p className="text-xs lightergray pb-2"> All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
