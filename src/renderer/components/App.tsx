import { LoginPage } from './Login/LoginPage';
import { MainLayout } from './Main/MainLayout';
import { ErrorPage } from './Error/ErrorPage';
import { useSelector } from 'react-redux';
import { isAuthenticated } from 'renderer/logic/slice';
import { useGetUsersQuery } from 'renderer/api/twitchApi';

export default function App() {  

  const isAuth = useSelector(isAuthenticated);
  const { error } = useGetUsersQuery({}, { skip: !isAuth });

  if (!isAuth) {
    return <LoginPage />
  }

  if (error) {
    return <ErrorPage />
  }

  return <MainLayout />;
}
