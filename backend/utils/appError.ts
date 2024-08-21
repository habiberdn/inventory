export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number) {
      super(message); // Call the parent constructor
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? "fail" : "error";
      this.isOperational = true;
  
      // Capture stack trace, excluding the constructor call from it
      Error.captureStackTrace(this, this.constructor);
    }
  }
  