import { useState, useEffect, useCallback } from 'react'
import { deleteUser, getUsers } from '../api/users';
import type { User } from '../types/user';
import { Table, Space, Popconfirm, message, Spin } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const UserListPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchUsers = useCallback(async () => {
        setLoading(true)
        try {
            const response = await getUsers()
            setUsers(response)
        } catch {
            message.error('Failed to fetch users')
        } finally {
            setLoading(false)
        }
    }, []);

    const handleDelete = async (id?: number) => {
        if (!id) return
        try {
            await deleteUser(id)
            message.success('User deleted successfully')
            fetchUsers()
        } catch {
            message.error('Failed to delete user')
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const userTableColumns: ColumnsType<User> = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            sorter: (a, b) => a.lastName.localeCompare(b.lastName),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: User) => (
                <Space size="middle">
                    <EditOutlined
                        style={{ color: '#1677ff', cursor: 'pointer' }}
                    />

                    <Popconfirm
                        title="Delete user"
                        description="Are you sure you want to delete this user?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined
                            style={{ color: '#ff4d4f', cursor: 'pointer' }}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    if (loading) {
        return (
            <div className='h-100 text-center d-flex justify-content-center align-items-center'>
                <Spin tip="Loading" />
            </div>
        )
    }

    return (
        <div className='container d-flex flex-column'>
            <div className='d-flex justify-content-end m-b-10'>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/users/create')}
                    className='primary-btn'
                >
                    Add User
                </Button>
            </div>
            <Table
                dataSource={users}
                columns={userTableColumns}
                loading={loading}
                rowKey="id"
                pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50'],
                    hideOnSinglePage: true,
                }}
            />
        </div>
    )
}

export default UserListPage
