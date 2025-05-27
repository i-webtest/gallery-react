import { Date } from '../Date/Date';
import s from './Author.module.scss';

import profile from './img/profile.avif';

export const Author = ({ className }) => {
  return className ? (
    <div className={`${s.author} ${className}`}>
      <img className={s.avatar} src={profile} alt='' />

      <p className={s.name}>Author Author</p>

      <Date className={s.date} />
    </div>
  ) : (
    <div className={s.author}>
      <img className={s.avatar} src={profile} alt='' />

      <p className={s.name}>Author Author</p>

      <Date className={s.date} />
    </div>
  );
};
