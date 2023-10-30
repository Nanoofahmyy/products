import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { Product } from '../models/product.model'; 

const SECRET_KEY = 'your_secret_key'; // Replace with your secret key

class UserController {
    async register(req: Request, res: Response) {
        try {
          const { username, password } = req.body;
    
          const existingUser = await User.findOne({ where: { username } });
    
          if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
          }
    
          const hashedPassword = await bcrypt.hash(password, 10);
    
          const newUser = await User.create({username: username,password: hashedPassword,});
    
          return res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }
    

  async login(req: Request, res: Response) {
    try {
    
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY);

      return res.status(200).json({ message: 'Authentication successful', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default UserController;
