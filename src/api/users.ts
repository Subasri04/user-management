import { api } from './axios';
import type { User } from '../types/user';

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response?.data;
};

export const createUser = async (user: User): Promise<User> => {
    const response = await api.post<User>('/users', user);
    return response?.data;
}

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
    const response = await api.patch<User>(`/users/${id}`, user);
    return response?.data;
}

export const deleteUser = async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
}