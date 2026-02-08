import { Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import { Layout } from 'antd';
import AppHeader from './components/Header';
import './styles/index.scss'
import NotFoundPage from './pages/NotFoundPage';
import UserUpsertPage from './pages/UserUpsertPage';

const App = () => {
  return (
    <Layout>
      <AppHeader />

      <Routes>
        <Route path='/' element={<UserListPage />} />
        <Route path='/users/create' element={<UserUpsertPage />} />
        <Route path='/users/edit/:id' element={<UserUpsertPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
