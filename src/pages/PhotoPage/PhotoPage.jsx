/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import s from './PhotoPage.module.scss';
import { useNavigate, useParams } from 'react-router';
import { usePhoto } from '../../hooks/usePhoto';
import { useEffect, useState } from 'react';
import { Author } from '../../components/Author/Author';
import { likeUpdate } from '../../api/like';
import { photoSlice } from '../../store/photo/photoSlice';
import { addError, deleteError } from '../../store/errorsReducer';
import { Preloader } from '../../UI/Preloader/Preloader';

export const PhotoPage = () => {
  const token = useSelector((state) => state.token.token);
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, likes, isLiked, status, error] = usePhoto(id);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const handleLikeClick = () => {
    if (token) {
      const method = isLiked ? 'DELETE' : 'POST';
      likeUpdate(id, token, method);
      dispatch(photoSlice.actions.changeLikes());
    } else {
      dispatch(addError('Вы не авторизованы'));

      setTimeout(() => {
        dispatch(deleteError());
      }, 2000);
    }
  };

  const imageLoaded = () => {
    setLoading(false);
  };

  const navigateToMain = () => {
    navigate('/');
  };

  useEffect(() => {
    if (error) {
      navigateToMain();

      const errorMessage = error.includes('status code 403') ? `Исчерпан лимит запросов` : `Ошибка загрузки фотографии`;

      dispatch(addError(errorMessage));

      setTimeout(() => {
        dispatch(deleteError());
      }, 2000);
    }
  }, [error]);

  const handleClickComebackToMain = () => {
    navigateToMain();
  };

  return (
    <div className={s.photoPage}>
      {!error && (
        <>
          {(status === 'loading' || loading) && <Preloader />}

          {status === 'loaded' && (
            <>
              <figure className={s.figure}>
                <img className={s.img} onLoad={imageLoaded} src={photo.urls.full} alt={photo.alt_description} />

                <figcaption className={s.caption}>
                  <Author
                    className={s.author}
                    author={photo.user.name}
                    link={photo.user.links.html}
                    date={photo.created_at}
                    profileImage={photo.user.profile_image.medium}
                  />

                  <div className={s.wrapper}>
                    <button
                      className={`${s.button} ${s[isLiked ? 'liked' : 'like']}`}
                      onClick={() => handleLikeClick()}
                    >
                      <svg
                        className={s.icon}
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        version='1.1'
                        aria-hidden='false'
                      >
                        <path d='M21.424 4.594c-2.101-2.125-5.603-2.125-7.804 0l-1.601 1.619-1.601-1.62c-2.101-2.124-5.603-2.124-7.804 0-2.202 2.126-2.102 5.668 0 7.894L12.019 22l9.405-9.513a5.73 5.73 0 0 0 0-7.893Z'></path>
                      </svg>
                    </button>

                    <span className={s.count}>{likes}</span>
                  </div>
                </figcaption>
              </figure>

              <button className={s.back} onClick={handleClickComebackToMain} type='button'>
                <svg width='24' height='12' viewBox='0 0 24 12' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                  <line y1='6' x2='18' y2='6' stroke='currentColor' strokeWidth='2' />
                  <path d='M24 6L17.25 11.1962L17.25 0.803848L24 6Z' fill='currentColor' />
                </svg>
                Назад
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};
