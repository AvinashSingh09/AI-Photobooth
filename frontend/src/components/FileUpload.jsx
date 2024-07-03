import React from 'react';

const FileUpload = ({ setTargetImage }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const pngDataUrl = canvas.toDataURL('image/png');
          setTargetImage(pngDataUrl);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
  );
};

export default FileUpload;
