import 'next-auth'

declare module 'next-auth' {
    interface User{
        _id?: string;
        twoFactorActivated?: boolean;
        username?: string
    }
    interface Session{
        user: {
            _id?: string;
            twoFactorActivated?: boolean;
            username?: string
    
        } & DefaultSession['user']
    }
}
declare module 'next-auth/jwt' {
    
}