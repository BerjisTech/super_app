import api from '@/api/api';
import { AuthRequest } from '@interface/User';

export const getUsers = async (): Promise<AuthRequest[]> => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Other user-related API calls
