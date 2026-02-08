export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'date'
  | 'textarea'

export interface FormField {
  name: string;
  label: string
  type: FieldType
  required?: boolean
}

export const userFormSchema: FormField[] = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  { name: 'email', label: 'Email Address', type: 'email', required: true },
  { name: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true },
]
