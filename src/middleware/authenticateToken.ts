import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; 

interface AuthenticatedUser {
  userId: number; 
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const extractedToken = token.split(" ")[1]; 
    verifyToken(extractedToken , req); 

    next(); 
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Token is invalid' });
  }
};

const verifyToken = (token: string , req: Request): void => {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);

    const { userId, username } = decodedToken as { userId: number; username: string };

     req.user = { userId, username };
  } catch (error) {
    
    throw new Error('Token verification error');
  }
};
