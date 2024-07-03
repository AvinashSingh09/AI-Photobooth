import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import GenderPage from './pages/GenderPage';
import CapturePage from './pages/CapturePage';
import ImageSelectionPage from './pages/ImageSelectionPage';
import axios from 'axios';
import Response from './pages/Response';

const App = () => {
  const [gender, setGender] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [responseImage, setResponseImage] = useState(null);
  const [targetImage, setTargetImage] = useState('');
  const [isResponse, setisResponse] = useState('');
  
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    cropAndConvertToPng(imageSrc).then(croppedImage => {
      setScreenshot(croppedImage);
      sendToServer(croppedImage);
    });
  };

  const cropAndConvertToPng = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size to the size of the marked area
        const cropWidth = 150;
        const cropHeight = 200;
        const cropX = (img.width - cropWidth) / 2;
        const cropY = (img.height - cropHeight) / 2;

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        // Draw the cropped image onto the canvas
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        // Convert the canvas to a PNG data URL
        const pngDataUrl = canvas.toDataURL('image/png');
        resolve(pngDataUrl);
      };
    });
  };

  const sendToServer = (image) => {
    const payload = {
      "source_image": image,
      "target_image": targetImage, // Add your target image base64 here
      "source_faces_index": [0],
      "face_index": [0],
      "upscaler": "None",
      "scale": 1,
      "upscale_visibility": 1,
      "face_restorer": "CodeFormer",
      "restorer_visibility": 1,
      "codeformer_weight": 0.5,
      "restore_first": 1,
      "model": "inswapper_128.onnx",
      "gender_source": gender === 'male' ? 2 : 1,
      "gender_target": gender === 'male' ? 2 : 1,
      "save_to_file": 0,
      "result_file_path": "",
      "device": "CUDA",
      "mask_face": 0,
      "select_source": 0,
      "face_model": "None",
      "source_folder": "",
    };

    axios.post('https://7b910184a20104a7d0.gradio.live/reactor/image', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response);
        if(response.data.image){
          setResponseImage(response.data.image); // Assuming response has image data in base64 format
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/gender" element={<GenderPage setGender={setGender} />} />
        <Route path="/response" element={<Response responseImage={responseImage} />} />
        <Route path="/image-selection" element={<ImageSelectionPage gender={gender} setTargetImage={setTargetImage} />} />
        <Route path="/capture" element={<CapturePage 
          setTargetImage={setTargetImage}
          webcamRef={webcamRef}
          capture={capture}
          screenshot={screenshot}
          responseImage={responseImage}
        />} />
      </Routes>
    </Router>
  );
};

export default App;
