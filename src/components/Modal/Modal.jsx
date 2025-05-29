import { useSelector } from 'react-redux';
import s from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { randomId } from '../../utils/randomId';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const Modal = () => {
  const errors = useSelector((state) => state.errors.errors);

  return (
    <>
      {createPortal(
        <>
          {errors.length > 0 && (
            <div className={s.overlay}>
              {errors.map((error) => (
                <ErrorMessage key={randomId()} error={error} />
              ))}
            </div>
          )}
        </>,

        document.getElementById('modal'),
      )}
    </>
  );
};
