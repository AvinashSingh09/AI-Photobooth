import React from 'react';
import {useNavigate } from 'react-router-dom';
import girl from '../assets/GIRL.png'
import boy from '../assets/BOY.png'

const GenderSelection = ({ setGender }) => {
  const navigate = useNavigate();

  const handleGenderSelection = (gender) => {
    setGender(gender);
    navigate('/image-selection');
  };

  return (
    <div className='w-full h-full flex md:flex-row  flex-col justify-center items-center gap-6'>
      <img src={boy} className='h-full w-[200px] md:w-[300px]  cursor-pointer'  onClick={() => handleGenderSelection('male')} alt="" />
      <img src={girl} className='h-full w-[200px] md:w-[300px] cursor-pointer' onClick={() => handleGenderSelection('female')} alt="" />
    </div>
  );
};

export default GenderSelection;
