import React from 'react';
import { useNavigate } from 'react-router-dom';
import male1 from '../assets/male1.jpeg';
import male2 from '../assets/male2.jpeg';
import female1 from '../assets/girl1.jpeg';
import female2 from '../assets/girl2.jpeg';

const ImageSelection = ({ gender, setTargetImage }) => {
  const navigate = useNavigate();
  const images = gender === 'male'
    ? [male1, male2]
    : [female1, female2];

  const handleImageSelect = (image) => {
    convertToPngIfNeeded(image).then(base64Image => {
      setTargetImage(base64Image);
      navigate('/capture');
    });
  };

  const convertToPngIfNeeded = (imageSrc) => {
    return new Promise((resolve) => {
      if (imageSrc.endsWith('.png')) {
        // If the image is already PNG, convert it directly to base64
        fetch(imageSrc)
          .then(res => res.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
      } else {
        // Convert the image to PNG and then to base64
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const pngDataUrl = canvas.toDataURL('image/png');
          resolve(pngDataUrl);
        };
      }
    });
  };

  return (
    <div className="flex md:flex-row  flex-col justify-center items-center w-full h-[100vh] gap-6">
      {images.map((image, index) => (
        <div key={index} className="md:w-[300px] w-[200px]" onClick={() => handleImageSelect(image)}>
          <img src={image} alt={`Option ${index + 1}`} className="selectable-image cursor-pointer" />
        </div>
      ))}
    </div>
  );
};

export default ImageSelection;
