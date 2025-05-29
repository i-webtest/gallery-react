/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { Photo } from '../../components/Photo/Photo';
import s from './MainPage.module.scss';
import { useEffect, useRef } from 'react';
import { photosSlice } from '../../store/photos/photosSlice';
import { photosRequestAsync } from '../../store/photos/photosAction';
import { addError, deleteError } from '../../store/errorsReducer';
import { randomId } from '../../utils/randomId';
import { Preloader } from '../../UI/Preloader/Preloader';

export const MainPage = () => {
  const token = useSelector((state) => state.token.token);
  const photos = useSelector((state) => state.photos.photos);
  const page = useSelector((state) => state.photos.page);
  const loading = useSelector((state) => state.photos.loading);
  const error = useSelector((state) => state.photos.error);
  const endList = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photosSlice.actions.photosClear());
    dispatch(photosRequestAsync());
  }, [token]);

  useEffect(() => {
    if (error) {
      const errorMessage = error.includes('status code 403') ? 'Лимит исчерпан' : 'Ошибка загрузки';

      dispatch(addError(errorMessage));

      setTimeout(() => {
        dispatch(deleteError());
      }, 2000);
    }

    dispatch(photosSlice.actions.photosClear());
  }, [error]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (page !== 1) {
            dispatch(photosRequestAsync());
          }
        }
      },
      {
        rootMargin: '100px',
      },
    );

    if (endList.current) {
      observer.observe(endList.current);
    }

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [page]);

  return (
    <>
      {page === 1 && loading && <Preloader />}
      <ul className={s.list}>
        {!error.includes('403') ? (
          <>
            {photos.map((photo) => (
              <Photo key={randomId()} photoData={photo} />
            ))}

            {page !== 1 && loading && <Preloader />}
          </>
        ) : (
          <Preloader />
        )}
      </ul>

      <div className={s.end} ref={endList} />
    </>
  );
};
