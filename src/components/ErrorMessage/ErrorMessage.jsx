import s from './ErrorMessage.module.scss';

export const ErrorMessage = ({ error }) => {
  console.log('error: ', error);
  return (
    <div className={s.modal}>
      <p className={s.text}>{error}</p>
    </div>
  );
};
