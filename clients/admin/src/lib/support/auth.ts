import { store } from './store';

export interface WithToken {
    token: string;
}

export const authStore = store<WithToken | null>(
    process.env.MOCK ? { token: Date.now().toString() } : null,
); // start with no user
