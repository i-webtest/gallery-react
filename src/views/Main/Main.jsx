import { Route, Routes } from 'react-router';
import { Container } from '../Container/Container';
import s from './Main.module.scss';
import { MainPage } from '../../pages/MainPage/MainPage';

export const Main = () => {
  return (
    <main className={s.main}>
      <Container className={s.container}>
        <Routes>
          <Route path='/' element={<MainPage />} />
        </Routes>
      </Container>
    </main>
  );
};
