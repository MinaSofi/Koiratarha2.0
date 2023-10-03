interface User {
    username: string;
    password: string;
}

interface UserLogin {
    username: string;
    id: string;
}

interface TokenUser {
    id: string;
}

interface UserIdWithToken {
    id: string;
    token: string;
}

export {User, UserLogin, TokenUser, UserIdWithToken}