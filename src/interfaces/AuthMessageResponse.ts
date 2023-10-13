import {UserLogin} from './User';

export default interface AuthMessageResponse {
  message: string;
  data: UserLogin | UserLogin[];
}
