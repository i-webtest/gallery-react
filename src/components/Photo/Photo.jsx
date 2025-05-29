import { useState } from 'react';
import { Author } from '../Author/Author';
import { Like } from '../Like/Like';
import { Link } from 'react-router';
import s from './Photo.module.scss';

export const Photo = ({ photoData }) => {
  const [loading, setLoading] = useState(true);

  const imgLoaded = () => {
    setLoading(false);
  };

  return (
    <li className={s.item}>
      <figure className={s.figure} style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <article className={s.card}>
          <div className={s.info}>
            <Author
              className={s.author}
              author={photoData.user.name}
              link={photoData.user.links.html}
              date={photoData.created_at}
              profileImage={photoData.user.profile_image.medium}
            />
            <Like className={s.like} likes={photoData.likes} liked={photoData.liked_by_user} />
          </div>

          <Link className={s.link} to={`/photo/${photoData.id}`}>
            <img className={s.img} src={photoData.urls.small} alt={photoData.alt_description} onLoad={imgLoaded} />
          </Link>
        </article>
      </figure>
    </li>
  );
};
