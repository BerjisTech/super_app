import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AuthService } from '@service/Auth';

export function withAuth(Component: any) {
    return function WithAuth(props: any) {
        const router = useRouter();

        useEffect(() => {
            const isAuthenticated = AuthService.isAuthenticated();
            if (!isAuthenticated) {
                router.push('/auth/signin');
            }
        }, []);

        return <Component {...props} />;
    };
}