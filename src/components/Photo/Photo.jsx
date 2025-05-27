import { Author } from '../Author/Author';
import { Like } from '../Like/Like';
import s from './Photo.module.scss';

import photo from './img/photo.avif';

export const Photo = () => {
  return (
    <li className={s.item}>
      <article className={s.card}>
        <Author className={s.author} />

        <a className={s.link} href='#'>
          <img className={s.img} src={photo} alt='' />
        </a>

        <Like className={s.like} />
      </article>
    </li>
  );
};
