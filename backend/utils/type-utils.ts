import { IncomingMessage,ServerResponse } from 'http';

export enum Role {
    SuperAdmin = "SuperAdmin",
    Admin = "Admin"
}

type NextFunction = (err?: Error) => void | Promise<void>;

export interface MiddlewareLogin {
    (req: LoginRequest, res: ServerResponse, next: NextFunction): void | Promise<void>;
}

export interface MiddlewareSignup {
    (req: SignupRequest, res: ServerResponse, next: NextFunction): void | Promise<void>;
}

export interface MiddlewareProduct {
    (req: ProductRequest, res: ServerResponse): void | Promise<void>;
}

export interface CookieOptions {
    expires: Date;
    path: string;
    domain: string;
    httpOnly?: boolean;
    secure?: boolean;
}

export interface User {
    id: string | number;
    password?: string;
    [key: string]: any; // Allow for any additional properties
}

export interface SignupRequest extends IncomingMessage {
    body: {
        username: string;
        password: string;
        field: string
        description: string
        role: Role
    };
}

export interface LoginRequest extends IncomingMessage {
    body: {
        username: string;
        password: string;
        role: Role
    }
}

export interface ProductRequest extends IncomingMessage {
    body: {
        name: string;
        description: string;
        status: string;
        category: string
    }
}

export interface ProductRequestById extends IncomingMessage {
    body: {
        name: string;
        description: string;
        status: string;
        category: string;
       
    }
}