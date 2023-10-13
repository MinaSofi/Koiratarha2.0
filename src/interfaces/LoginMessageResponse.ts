import {UserLogin} from './User';

export default interface LoginMessageResponse {
  token: string;
  message: string;
  user: UserLogin;
}
