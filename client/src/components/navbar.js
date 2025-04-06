import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaCircle, FaCloud, FaUser } from 'react-icons/fa';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../firebase/auth';


const Navbar = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => navigate('/login');
  const handleSignupClick = () => navigate('/signup');
  const handleLogoutClick = () => {
    doSignOut();
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="bg-[#000000bc] text-white flex justify-between items-center h-[80px] w-screen fixed top-0 left-0 z-50 px-4">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <img src="/mascot_bigger-4.png" alt="Logo" onClick={handleLogoClick} className="w-[50px] h-[50px] rounded-full" />
        <button className="nav-button cursor-custom">About</button>
        <button className="nav-button cursor-custom">Contact</button>
      </div>

      {/* Center Brand - Absolutely Positioned */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-white font-[Farro] cursor-custom text-[32px] font-normal leading-[100%] text-center">
        🅦🅔🅗🅐🅒🅚 ❷⓿❷❺
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {userLoggedIn ? (
          <button
            className="cursor-custom nav-button bg-[#ffffff4d] rounded-3xl"
            onClick={handleLogoutClick}
          >
            <FaUser className="mr-[8px]" /> Log Out
          </button>
        ) : (
          <>
            <button className="nav-button " onClick={handleLoginClick}>
              <FaUser className="mr-[8px]" /> Log In
            </button>
            <button
              className="nav-button bg-[#ffffff4d] rounded-3xl"
              onClick={handleSignupClick}
            >
              <FaCloud className="mr-[8px]" /> Sign Up
            </button>
          </>
        )}
      </div>

      {/* Shared styles */}
      <style jsx>{`
        .nav-button {
          background: transparent;
          border: none;
          padding: 10px 15px;
          font-family: 'Farro', sans-serif;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: all 0.3s ease-in-out;
          color: white;
        }
        .nav-button:hover {
          color: #D19CA3;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
