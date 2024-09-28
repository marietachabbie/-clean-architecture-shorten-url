import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  res.status(418).json({
    success: false,
    message: error.message,
  });
};

export default ErrorHandler;
