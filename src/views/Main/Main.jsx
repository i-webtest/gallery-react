import { Route, Routes } from 'react-router';
import { Container } from '../Container/Container';
import s from './Main.module.scss';
import { MainPage } from '../../pages/MainPage/MainPage';
import { PhotoPage } from '../../pages/PhotoPage/PhotoPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';

export const Main = () => {
  return (
    <main className={s.main}>
      <Container className={s.container}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/photo/:id' element={<PhotoPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Container>
    </main>
  );
};
