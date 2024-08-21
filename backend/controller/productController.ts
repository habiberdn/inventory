import { PrismaClient } from "@prisma/client";
import { ServerResponse, IncomingMessage } from 'http';
import bcrypt from 'bcryptjs';
import { AppError } from "../utils/appError";
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();