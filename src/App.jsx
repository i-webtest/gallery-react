import { useDispatch } from 'react-redux';
import { Header } from './views/Header/Header';
import { Main } from './views/Main/Main';
import { updateToken } from './store/tokenReducer';
import { getToken } from './api/token';
import { Route, Routes } from 'react-router';
import { Modal } from './components/Modal/Modal';

export const App = () => {
  const dispatch = useDispatch();

  dispatch(updateToken(getToken()));

  return (
    <Routes>
      <Route
        path='*'
        element={
          <>
            <Header />
            <Main />
            <Modal />
          </>
        }
      ></Route>
    </Routes>
  );
};
