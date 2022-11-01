import React from "react";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-screen bg-gray-700 flex flex-col justify-center py-4 mt-12 items-center text-base sm:text-lg lg:text-xl lg:py-6 lg:mt-24">
      <div className="flex justify-center items-center">
        <a
          href="https://github.com/vrckomark/weather-app"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub className="text-2xl sm:text-3xl lg:text-4xl mr-4 hover:text-sky-400 cursor-pointer transition-colors" />
        </a>
        <div>Made by Mark Vrčko / Vrechko</div>
      </div>
      <div className="flex justify-center items-center text-sm text-gray-300 mt-2 sm:text-base lg:text-lg">
        Data provided by&nbsp;
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
          className="text-sky-400"
        >
          Open-Meteo
        </a>
      </div>
    </footer>
  );
};

export default Footer;
