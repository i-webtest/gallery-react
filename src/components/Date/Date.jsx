import s from './Date.module.scss';
import { formatDate } from '../../utils/formatDate';

export const Date = ({ date, className }) =>
  className ? (
    <time className={`${s.date} ${className}`} dateTime={date}>
      {formatDate(date)}
    </time>
  ) : (
    <time className={s.date} dateTime={date}>
      {formatDate(date)}
    </time>
  );
