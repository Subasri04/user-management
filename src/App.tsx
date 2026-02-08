import { Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import './styles/index.scss'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<UserListPage />} />
    </Routes>
  )
}

export default App
