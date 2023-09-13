import api from '@/api/api';
import { User } from '@interface/User';

export const signIn = async (email: string, password: string): Promise<User> => {
    try {
        const response = await api.post('/signin', { onagi: {email: email, password: password} });
        const authorizationHeader = response.headers.authorization;
        if(authorizationHeader) localStorage.setItem('token', authorizationHeader.split(' ')[1]);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const signUp = async (email: string, password: string, name: string): Promise<User> => {
    try {
        const response = await api.post('/signup', { onagi: {email, password, name} });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const signOut = async (): Promise<void> => {
    try {
        localStorage.removeItem('token');
        const response = await api.post('/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
}