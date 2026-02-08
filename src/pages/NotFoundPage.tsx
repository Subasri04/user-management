import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button className='primary-btn' onClick={() => navigate('/')}>
                        Back to Users
                    </Button>
                }
            />
        </div>
    )
}

export default NotFoundPage
