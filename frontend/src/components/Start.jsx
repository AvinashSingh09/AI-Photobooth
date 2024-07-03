import React from 'react';
import {useNavigate } from 'react-router-dom';
import start from '../assets/Generate.png'

const Start = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/gender');
  };

  return (
    <img className='cursor-pointer' src={start} onClick={handleStart} alt="" />
  );
};

export default Start;
