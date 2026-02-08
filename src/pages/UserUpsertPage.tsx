import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, message, Spin } from 'antd'

import { createUser, getUserById, updateUser } from '../api/users'
import { UserForm } from '../components/UserForm'
import type { User } from '../types/user'

import '../styles/upsert-user.scss';

const UserUpsertPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const isEditMode = Boolean(id)

  const [initialValues, setInitialValues] = useState<Partial<User>>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isEditMode) return

    const fetchUser = async () => {
      setLoading(true)
      try {
        const user = await getUserById(Number(id))
        setInitialValues(user)
      } catch {
        message.error('Failed to load user')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id, isEditMode, navigate])

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      if (isEditMode) {
        await updateUser(Number(id), values)
        message.success('User updated successfully')
      } else {
        await createUser(values)
        message.success('User created successfully')
      }
      navigate('/')
    } catch {
      message.error('Failed to save user')
    }
  }

  if (loading) {
    return (
      <div className='container h-100 d-flex justify-content-center align-items-center'>
        <Spin tip="Loading..." />
      </div>
    )
  }

  return (
    <div className='container upsert-user-container h-100'>
      <Card>
        <UserForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  )

}

export default UserUpsertPage
