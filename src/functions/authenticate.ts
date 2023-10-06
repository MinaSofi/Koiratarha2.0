import {Request} from 'express';
import jwt from 'jsonwebtoken';
import {TokenUser, UserIdWithToken} from '../interfaces/User';

export default async (req: Request) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return {};
  }

  const token = bearer.split(' ')[1];

  if (!token) {
    return {};
  }

  const userFromToken = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as TokenUser;

  if (!userFromToken) {
    return {};
  }

  // check that user is in auth server
  const response = await fetch(`${process.env.AUTH_URL}/users/token`, {
    headers: {Authorization: req.headers.authorization as string},
  });
  if (!response.ok) {
    return {};
  }

  const userIdWithToken: UserIdWithToken = {
    id: userFromToken.id,
    token,
  };

  return userIdWithToken;
};
