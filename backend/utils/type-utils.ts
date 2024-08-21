import { IncomingMessage,ServerResponse } from 'http';

enum Role {
    Customer = "Customer",
    Admin = "Admin"
}

type NextFunction = (err?: Error) => void | Promise<void>;

export interface MiddlewareLogin {
    (req: LoginRequest, res: ServerResponse, next: NextFunction): void | Promise<void>;
}

export interface MiddlewareSignup {
    (req: SignupRequest, res: ServerResponse, next: NextFunction): void | Promise<void>;
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