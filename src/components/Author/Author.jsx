import { Date } from '../Date/Date';
import s from './Author.module.scss';

export const Author = ({ className, author, link, profileImage, date }) => {
  return className ? (
    <div className={`${s.author} ${className}`}>
      <a className={s.linkAvatar} href={link}>
        <img className={s.avatar} src={profileImage} alt={author} />
      </a>

      <a className={s.linkName} href={link}>
        {author}
      </a>

      <Date className={s.date} date={date} />
    </div>
  ) : (
    <div className={s.author}>
      <a className={s.linkAvatar} href={link}>
        <img className={s.avatar} src={profileImage} alt={author} />
      </a>

      <a className={s.linkName} href={link}>
        {author}
      </a>

      <Date className={s.date} date={date} />
    </div>
  );
};
