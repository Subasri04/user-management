import { Typography, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

import '../styles/header.scss';

const { Title } = Typography;

const AppHeader = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const isListPage = location.pathname === '/'
    const isCreatePage = location.pathname === '/users/create'
    const isEditPage = location.pathname.includes('/edit')

    const getTitle = () => {
        if (isListPage) return 'Users'
        if (isCreatePage) return 'Create User'
        if (isEditPage) return 'Edit User'
        return 'User Management'
    }

    return (
        <div className="app-header">
            {!isListPage && (
                <Button
                    type="text"
                    size='large'
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/')}
                    className="back-btn"
                />
            )}

            <Title level={4} className="header-title">
                {getTitle()}
            </Title>
        </div>

    )
}

export default AppHeader
