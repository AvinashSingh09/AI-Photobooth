import React, { useEffect, useState } from 'react';
import WebcamCapture from '../components/WebCapture';

import video from '../assets/WhatsApp Video 2024-07-01 at 2.21.57 PM.mp4';
import { useNavigate } from 'react-router-dom';

const CapturePage = ({ webcamRef, capture, screenshot, responseImage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCapture = () => {
    setIsLoading(true);
    capture();
  };

  useEffect(()=>{
    if(responseImage){
      navigate('/response')
    }
  },[responseImage])  

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <WebcamCapture webcamRef={webcamRef} capture={handleCapture} />
      {isLoading && !responseImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <video src={video} autoPlay loop className="w-full h-full object-cover" />
        </div>
      )}

    </div>
  );
};

export default CapturePage;
