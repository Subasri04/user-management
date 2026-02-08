export interface FormField {
    name: 'firstName' | 'lastName' | 'email' | 'phoneNumber';
    label: string;
    type: 'text' | 'email' | 'tel';
    required: boolean;
};

export const userFormSchema: FormField[] = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true },
];
