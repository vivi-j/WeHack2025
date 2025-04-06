import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaCircle, FaCloud, FaUser } from 'react-icons/fa';

const Navbar = () => {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const handleSignupClick = () => {
    navigate('/signup'); 
  };


  return (
    <nav className="bg-[#000000bc] opacity-100 text-white flex justify-between items-center h-[80px] w-screen fixed top-0 left-0 z-50">
            <div className="flex flex-start items-center">
              <FaCircle className="size-[50px] m-4" />
              <button className="bg-transparent text-white border-none px-[15px] py-[10px] mx-[5px] text-[18px] cursor-pointer flex items-center transition-all duration-300 ease-in-out text-center font-[Farro] font-normal leading-[100%] hover:text-[#D19CA3]">About</button>
              <button className="bg-transparent text-white border-none px-[15px] py-[10px] mx-[5px] text-[18px] cursor-pointer flex items-center transition-all duration-300 ease-in-out text-center font-[Farro] font-normal leading-[100%] hover:text-[#D19CA3]">Contact</button>
            </div>
            
            <div className="flex flex-center items-center">
            <h1 className="text-white text-center font-[Farro] text-[32px] font-normal leading-[100%] m-0">[Brand Name]</h1>
            </div>
            
            <div className="flex flex-end items-center">
              <button className="bg-transparent text-white border-none px-[15px] py-[10px] mx-[5px] text-[18px] cursor-pointer flex items-center transition-all duration-300 ease-in-out text-center font-[Farro] font-normal leading-[100%] hover:text-[#D19CA3] rounded-3xl"
                onClick={handleLoginClick}>
                <FaUser className="mr-[8px]" /> Log in
              </button>
              <button className="bg-[#ffffff33] text-white border-none px-[15px] py-[10px] mx-[5px] text-[18px] cursor-pointer flex items-center transition-all duration-300 ease-in-out text-center font-[Farro] font-normal leading-[100%] hover:text-[#D19CA3] bg-[#ffffff4d] rounded-3xl"
                onClick={handleSignupClick}>
                <FaCloud className="mr-[8px]" /> Sign up
              </button>
            </div>
    </nav>
  )
}

export default Navbar