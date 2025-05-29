import s from './ErrorMessage.module.scss';

export const ErrorMessage = ({ error }) => {
  return (
    <div className={s.modal}>
      <p className={s.text}>{error}</p>
    </div>
  );
};
