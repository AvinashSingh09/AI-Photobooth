import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';
import { Download, Mail, QrCode, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Response = ({ responseImage }) => {
  const [email, setEmail] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);

  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${responseImage}`;
    link.download = 'image.png';
    link.click();
  };

  const handleEmailClick = () => {
    setShowEmailInput(true);
  };

  const handleEmailSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/send-email', { to: email, image: responseImage });
      setShowEmailInput(false);
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  };

  const handleUpload = async () => {
    try {
      const base64Image = responseImage.replace(/^data:image\/[a-z]+;base64,/, '');
      const formData = new FormData();
      formData.append('file', dataURItoBlob(base64Image));
      formData.append('upload_preset', 'dhsoaijf'); // Replace with your upload preset

      const response = await axios.post('https://api.cloudinary.com/v1_1/difgb8jth/image/upload', formData);
      console.log(response.data.secure_url, "url");

      setQrCodeUrl(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const dataURItoBlob = (base64) => {
    const byteString = atob(base64);
    const mimeString = 'image/png';
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className="flex flex-col items-center">
      <img src={`data:image/png;base64,${responseImage}`} alt="Response" className="h-[75vh] mt-4" />
      <div className='flex items-center gap-6 mt-2'>
        <Download onClick={handleDownload} className="mr-2 cursor-pointer" />
        <Mail onClick={handleEmailClick} className="mr-2 cursor-pointer" />
        <QrCode onClick={handleUpload} className="mr-2 cursor-pointer" />
        <House onClick={() => navigate('/')} className="mr-2 cursor-pointer" />
      </div>
      {showEmailInput && (
        <div className="flex flex-col items-center mt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email to share"
            className="px-4 py-2 border rounded-lg"
          />
          <button onClick={handleEmailSubmit} className="flex items-center px-4 py-2 mt-2 bg-green-500 text-white rounded-lg">
            Submit
          </button>
        </div>
      )}
      {qrCodeUrl && (
        <div className="flex flex-col items-center my-4">
          <QRCode value={qrCodeUrl} className="mt-4" />
        </div>
      )}
    </div>
  );
};

export default Response;
