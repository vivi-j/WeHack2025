// Sidebar.js
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Start with the sidebar open

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${
        isOpen ? 'w-64' : 'w-16'
      } fixed left-0 top-[80px] h-full bg-gray-800 p-4 transition-all duration-300 ease-in-out`}
    >
      {/* Toggle Button */}
      {/*<button
        onClick={toggleSidebar}
        className="bg-transparent text-white p-2 rounded-md mb-6 w-full"
      >
        <FaBars />
      </button>*/}

      {isOpen && (
        <div>
          <h2 className="text-white text-xl mb-6">Sidebar</h2>
          <ul className="text-white">
            <li className="mb-4">Dashboard</li>
            <li className="mb-4">Analysis</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
