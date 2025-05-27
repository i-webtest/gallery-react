import React from 'react';
import { PulseLoader } from 'react-spinners';

export const Preloader = ({ size, margin }) => {
  return <PulseLoader color='#000000' cssOverride={{ display: 'block', margin: 'auto' }} size={size} margin={margin} />;
};
