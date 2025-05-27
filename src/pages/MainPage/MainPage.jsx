import { Photo } from '../../components/Photo/Photo';
import s from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <ul className={s.list}>
      <Photo />
    </ul>
  );
};
