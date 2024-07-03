import React from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ webcamRef, capture }) => {
  return (
    <div className="relative flex flex-col items-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-96 h-72"
        videoConstraints={{ facingMode: "user" }}
      />
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div
          className="border-4 border-red-500 pointer-events-auto"
          style={{ width: '150px', height: '200px' }}
        >
        </div>
      </div>
      <button
        onClick={capture}
        className="px-4 py-2 mt-4 bg-green-500 text-white rounded-lg pointer-events-auto"
      >
        Capture
      </button>
    </div>
  );
};

export default WebcamCapture;
