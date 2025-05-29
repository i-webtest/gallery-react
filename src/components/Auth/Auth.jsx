import s from './Auth.module.scss';
import login from '../../assets/login.svg';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { deleteToken } from '../../store/tokenReducer';
import { urlAuth } from '../../api/auth';
import { Preloader } from '../../UI/Preloader/Preloader';
import { addError, deleteError } from '../../store/errorsReducer';
import { useNavigate } from 'react-router';

export const Auth = () => {
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const [auth, loading, error, clearAuth] = useAuth();
  const navigate = useNavigate();

  const getOut = () => {
    setShowLogout(!showLogout);
  };

  const logOut = () => {
    dispatch(deleteToken());
    clearAuth();
  };

  useEffect(() => {
    if (error) {
      navigate('/');

      const errorMessage = error.includes('status code 403') ? `Исчерпан лимит` : `Ошибка`;

      dispatch(addError(errorMessage));

      setTimeout(() => {
        dispatch(deleteError());
        clearAuth();
      }, 2000);
    }
  }, [error]);

  return (
    <div className={s.container}>
      {loading ? (
        <Preloader size={5} margin={3} />
      ) : auth.name ? (
        <>
          <button className={s.btn} onClick={getOut}>
            <img className={s.img} src={auth.img} title={auth.name} alt={`Аватарка ${auth.name}`} />

            <span className={s.name}>{auth.name}</span>
          </button>

          {showLogout && (
            <button className={s.logout} onClick={logOut}>
              logout
            </button>
          )}
        </>
      ) : (
        <a className={s.auth} href={urlAuth}>
          <img className={s.img} src={login} alt='Log-In' />
        </a>
      )}
    </div>
  );
};
