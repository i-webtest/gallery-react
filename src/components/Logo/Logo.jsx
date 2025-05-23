import s from './Logo.module.scss';
import logo from '../../assets/logo.svg';

export const Logo = () => {
  return (
    <a href='/' className={s.logo}>
      <img className={s.img} src={logo} alt='Логотип галереи' />
    </a>
  );
};
