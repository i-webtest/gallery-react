import s from './Logo.module.scss';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router';

export const Logo = () => {
  return (
    <Link className={s.logo} to='/'>
      <img className={s.img} src={logo} alt='Логотип галереи' />
    </Link>
  );
};
