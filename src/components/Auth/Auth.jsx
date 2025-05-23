import s from './Auth.module.scss';
import login from '../../assets/login.svg';

export const Auth = () => {
  return (
    <a className={s.auth} href='/'>
      <img src={login} alt='Log-In' />
    </a>
  );
};
