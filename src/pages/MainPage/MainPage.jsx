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
import Masonry from 'react-masonry-css';
// import { Outlet } from 'react-router';
// import Masonry from 'react-masonry-css';
// import { ResponsiveMasonry } from 'react-responsive-masonry';

export const MainPage = () => {
  const token = useSelector((state) => state.token.token);
  const photos = useSelector((state) => state.photos.photos);
  const page = useSelector((state) => state.photos.page);
  const loading = useSelector((state) => state.photos.loading);
  const error = useSelector((state) => state.photos.error);
  const endList = useRef(null);

  const firstLoading = page === 1 ? loading : false;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photosSlice.actions.photosClear());
    dispatch(photosRequestAsync());
  }, [token]);

  useEffect(() => {
    if (error) {
      const errorMessage = error.includes('status code 403') ? 'Исчерпан лимит' : 'Ошибка загрузки';

      dispatch(addError(errorMessage));

      setTimeout(() => {
        dispatch(deleteError());
      }, 2000);
    }

    dispatch(photosSlice.actions.photosClear());
  }, [error]);

  useEffect(() => {
    // if (!photos.length) return;

    // const listEnd = endList.current;

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

  const breakpointColumnsObj = {
    default: 4,
    1024: 2,
    768: 1,
  };

  return (
    <>
      {firstLoading ? (
        <Preloader />
      ) : photos.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={s['my-masonry-grid']}
          columnClassName={s['my-masonry-grid_column']}
        >
          {photos.map((photo) => (
            <Photo key={randomId()} photoData={photo} />
          ))}
        </Masonry>
      ) : (
        <Preloader />
      )}

      {!firstLoading && (loading && !firstLoading ? <Preloader /> : <div className={s.end} ref={endList} />)}
    </>
  );
};
