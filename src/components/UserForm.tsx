import { Input, Button, DatePicker } from 'antd'
import { useEffect } from 'react'
import {
  useForm,
  Controller,
  type ControllerRenderProps,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

import { userFormSchema, type FormField } from '../config/user/formSchema'
import { buildValidationSchema } from '../config/user/validationSchema'

const { TextArea } = Input

const validationSchema = buildValidationSchema(userFormSchema)
type UserFormValues = z.infer<typeof validationSchema>

interface Props {
  initialValues?: Record<string, unknown>
  onSubmit: (values: Record<string, unknown>) => Promise<void>
}

const renderField = (
  field: FormField,
  controllerField: ControllerRenderProps<UserFormValues, string>,
  hasError: boolean
) => {
  const { value, onChange, ...rest } = controllerField

  switch (field.type) {
    case 'textarea':
      return (
        <TextArea
          {...rest}
          rows={4}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          status={hasError ? 'error' : ''}
        />
      )

    case 'date':
      return (
        <DatePicker
          {...rest}
          className='w-100'
          value={value ? dayjs(value as Date) : null}
          onChange={(date: Dayjs | null) =>
            onChange(date ? date.toDate() : undefined)
          }
          status={hasError ? 'error' : ''}
        />
      )

    default:
      return (
        <Input
          {...rest}
          type={field.type}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          status={hasError ? 'error' : ''}
        />
      )
  }
}

export function UserForm({ initialValues, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  })

  useEffect(() => {
    if (!initialValues) return

    const normalizedValues: Record<string, unknown> = {}

    userFormSchema.forEach((field) => {
      const value = initialValues[field.name]

      if (field.type === 'date') {
        normalizedValues[field.name] = value
          ? new Date(value as string)
          : undefined
      } else {
        normalizedValues[field.name] = value
      }
    })

    reset(normalizedValues)
  }, [initialValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {userFormSchema.map((field) => {
        const error = errors[field.name]

        return (
          <div key={field.name} className='m-b-10'>
            <label className='form-label'>
              {field.required && <span className='required'>* </span>}
              {field.label}
            </label>

            <Controller
              name={field.name}
              control={control}
              render={({ field: controllerField }) =>
                renderField(field, controllerField, Boolean(error))
              }
            />

            {error?.message && (
              <div className='error-message'>
                {error.message}
              </div>
            )}
          </div>
        )
      })}

      <div className='d-flex justify-content-end'>
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}
