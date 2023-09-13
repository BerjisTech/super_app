import api from '@/api/api';
import { User } from '@interface/User';

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Other user-related API calls
