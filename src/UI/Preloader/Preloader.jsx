import { PulseLoader } from 'react-spinners';

export const Preloader = ({ size, margin }) => (
  <PulseLoader color='#000000' cssOverride={{ display: 'block' }} size={size} margin={margin} />
);
