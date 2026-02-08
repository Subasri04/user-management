import { api } from './axios';

export const getUsers = async () => {
    const response = await api.get('/users');
    return response?.data;
};

export const getUserById = async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response?.data;
}

export const createUser = async (payload: Record<string, unknown>) => {
    const response = await api.post('/users', payload);
    return response?.data;
}

export const updateUser = async (id: number, payload: Record<string, unknown>) => {
    const response = await api.patch(`/users/${id}`, payload);
    return response?.data;
}

export const deleteUser = async (id: number) => {
    await api.delete(`/users/${id}`);
}
