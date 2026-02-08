import { Input, Button } from 'antd'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { userFormSchema } from '../config/user/formSchema'
import {
  userValidationSchema,
  type UserFormValues,
} from '../config/user/validationSchema'
import type { User } from '../types/user'

interface Props {
  initialValues?: Partial<User>
  onSubmit: (values: UserFormValues) => Promise<void>
}

export function UserForm({ initialValues, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userValidationSchema),
    defaultValues: initialValues || {},
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {userFormSchema.map((field) => (
        <div key={field.name} style={{ marginBottom: 16 }}>
          <label>{field.required && <span className='required'>*</span>}{field.label}</label>

          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <Input
                {...controllerField}
                type={field.type}
                status={errors[field.name] ? 'error' : ''}
              />
            )}
          />

          {errors[field.name]?.message && (
            <div className="error-message">
              {errors[field.name]?.message}
            </div>
          )}
        </div>
      ))}

      <div className="d-flex justify-content-end">
        <Button
          className="primary-btn"
          htmlType="submit"
          loading={isSubmitting}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}
