import React from 'react';
import Loading from '../components/loading';

const LoadingPage = () => {
  return (
    <div className="h-screen bg-[#0B0003] flex flex-col items-center justify-center text-center">
      <Loading />
      <p className="mt-4 text-gray-500 text-sm">Loading...</p>
    </div>
  );
};

export default LoadingPage;
