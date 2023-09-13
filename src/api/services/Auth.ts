import api from '@/api/api';
import { AuthRequest, RegisterRequest } from '@interface/User';

export const AuthService = {
    async login(credentials: AuthRequest, router: any): Promise<any> {
        const url = '/signin';
        try {
            const response = await api.post(url, { onagi: credentials });
            const authorizationHeader = response.headers.authorization;
            if (authorizationHeader) {
                localStorage.setItem('token', authorizationHeader.split(' ')[1]);
                localStorage.setItem('currentUser', JSON.stringify(response.data.status.data.onagi));
                router.push('/');
            }
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    async register(details: RegisterRequest, router: any): Promise<any> {
        const url = '/signup';
        try {
            const response = await api.post(url, { onagi: details });
            const authorizationHeader = response.headers.authorization;
            if (authorizationHeader) {
                localStorage.setItem('token', authorizationHeader.split(' ')[1]);
                router.push('/');
            } else {
                router.push('/auth/signin');
            }
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    async logout(router: any): Promise<void> {
        const url = '/signout';
        const token = localStorage.getItem('token');
        try {
            const response = await api.delete(url, { headers: { Authorization: `${token}` } });
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            router.push('/');
        } catch (error: any) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            router.push('/');
            throw error;
        }
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    },

    redirectToLogin(router: any): void {
        if (window.location.pathname.indexOf('auth') === -1 || window.location.pathname !== '/') {
            router.push('/auth/signin');
        }
    }
};