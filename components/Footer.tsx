import React from 'react';
import { FaInstagram, FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { SiMozilla } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 p-6 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

        <div className="text-sm md:text-base">
          <h1>© 2025 Codezilla SRMIST. All rights reserved</h1>
        </div>

        <div className="flex items-center space-x-4 py-4 md:py-0">
          <a
            href="https://www.instagram.com/codezillaclub/"
            aria-label="Instagram"
            className="text-gray-600 hover:text-black transition-colors duration-200"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://github.com/CodezillaClub"
            aria-label="GitHub"
            className="text-gray-600 hover:text-black transition-colors duration-200"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://community.mozilla.org/de/groups/codezilla/"
            aria-label="Mozilla"
            className="text-gray-600 hover:text-black transition-colors duration-200"
          >
            <SiMozilla size={20} />
          </a>
          <a
            href="https://www.linkedin.com/company/codezillaclub/"
            aria-label="LinkedIn"
            className="text-gray-600 hover:text-black transition-colors duration-200"
          >
            <FaLinkedinIn size={24} />
          </a>
          <a
            href="https://x.com/CodezillaClub"
            aria-label="X (formerly Twitter)"
            className="text-gray-600 hover:text-black transition-colors duration-200"
          >
            <FaXTwitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;