export interface User {
    name: string;
    email: string;
    id?: number; // id is optional because it might not exist for new users
}
