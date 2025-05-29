import { Auth } from '../../components/Auth/Auth';
import { Logo } from '../../components/Logo/Logo';
import { Container } from '../Container/Container';
import s from './Header.module.scss';

export const Header = () => {
  return (
    <header className={s.header}>
      <Container className={s.container}>
        <Logo />
        <Auth />
      </Container>
    </header>
  );
};
