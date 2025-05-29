import s from './Like.module.scss';

export const Like = ({ className, likes, liked }) => {
  const like = liked ? 'liked' : 'like';

  return className ? (
    <div className={`${s.wrapper} ${className}`}>
      <button className={`${s.button} ${like}`}>
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
  ) : (
    <div className={s.wrapper}>
      <button className={`${s.button} ${like}`}>
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

      <span className={s.count}>12</span>
    </div>
  );
};
