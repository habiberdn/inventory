import { PrismaClient } from "@prisma/client";
import { ServerResponse, IncomingMessage } from 'http';
import bcrypt from 'bcryptjs';
import { AppError } from "../utils/appError";
import jwt from 'jsonwebtoken';

import type { CookieOptions, User, MiddlewareLogin, MiddlewareSignup } from "../utils/type-utils";

const prisma = new PrismaClient();

const signToken = (id: string | number): string => {
  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRED_IN) {
    throw new Error('Missing environment variables for JWT');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED_IN,
  });
};

const createSendToken = (user: User, statusCode: number, res: ServerResponse): void => {
  const token = signToken(user.id);

  const cookieOptions: CookieOptions = {
    expires: new Date(
      Date.now() + (Number(process.env.JWT_COOKIE_EXPIRES_IN) || 7) * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true, // Uncomment if using httpOnly cookies
    path: '/seller',
    domain: 'localhost',
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions['secure'] = true;
  }

  // Remove password from the user object before sending it in the response
  user.password = undefined;

  // Set cookies on the response
  res.setHeader('jwt', [
    `jwt=${token}; Path=${cookieOptions.path}; Domain=${cookieOptions.domain}; Expires=${cookieOptions.expires.toUTCString()}`,
    `jwt=${token}; Path=/addProduct; Domain=${cookieOptions.domain}; Expires=${cookieOptions.expires.toUTCString()}`,
  ]);
  // Send the response
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      status: 'Success',
      token,
      data: {
        user,
      },
    })
  );
};

export const signup : MiddlewareSignup= async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashPassword,
        field: req.body.field,
        description : req.body.description,
        role : req.body.role
      },
    });

    createSendToken(user, 201, res);

    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: "success",
      user,
    }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
  
    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      res.end(JSON.stringify({ error: error.message }));
      console.error(error);
    } else {
      // If the error is not an instance of Error, handle it differently
      console.error('An unknown error occurred', error);
      res.end(JSON.stringify({ error: 'An unknown error occurred' }));
    }
  }
};

export const Login : MiddlewareLogin = async (req,res,next) => {
  const { password,username } = req.body;

  if (!password) {
    return next(new AppError("Please provide email and password", 401));
  }

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  createSendToken(user, 200, res);

}

