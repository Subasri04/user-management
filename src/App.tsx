import { Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import { Layout } from 'antd';
import AppHeader from './components/Header';
import './styles/index.scss'
import NotFoundPage from './pages/NotFoundPage';

const { Content } = Layout;

const App = () => {
  return (
    <Layout className='h-100'>
      <AppHeader />

      <Content>
        <Routes>
          <Route path='/' element={<UserListPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Content>
    </Layout>
  )
}

export default App
