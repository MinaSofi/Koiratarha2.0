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

interface UserTest {
  id?: string;
  username?: string;
  userName?: string;
  password?: string;
  token?: string;
}

export {User, UserLogin, TokenUser, UserIdWithToken, UserTest};
