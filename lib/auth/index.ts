import { AuthService } from './rpc';

export const getAuthService = () => {
    return new AuthService("http://127.0.0.1:8080", global.fetch);
}

export * from './rpc';