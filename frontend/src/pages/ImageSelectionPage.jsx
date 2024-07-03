import React from 'react';
import ImageSelection from '../components/ImageSelection';

const ImageSelectionPage = ({ gender, setTargetImage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ImageSelection gender={gender} setTargetImage={setTargetImage} />
    </div>
  );
};

export default ImageSelectionPage;
