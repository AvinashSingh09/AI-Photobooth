import React from 'react';
import GenderSelection from '../components/GenderSelection';

const GenderPage = ({ setGender }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <GenderSelection setGender={setGender} />
    </div>
  );
};

export default GenderPage;
