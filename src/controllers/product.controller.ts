import { Request, Response } from 'express';
import { Product } from '../models/product.model';

interface AuthenticatedUser {
  userId: number;
  username: string;
}

interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

class ProductController {
  async getAllProducts(req: AuthenticatedRequest, res: Response) {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getProductById(req: AuthenticatedRequest, res: Response) {
    const productId = req.params.id;
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createProduct(req: AuthenticatedRequest, res: Response) {
    const { title, image, price } = req.body;
    const userId = req.user?.userId; 

    if (userId === undefined) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    try {
      const newProduct = await Product.create({ title, image, price, userId });
      return res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateProduct(req: AuthenticatedRequest, res: Response) {
    const productId = req.params.id;
    const userId = req.user?.userId;

    if (userId === undefined) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { title, image, price } = req.body;

    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.userId !== userId) {
        return res.status(403).json({ message: 'Unauthorized: You do not own this product' });
      }

      product.title = title;
      product.image = image;
      product.price = price;
      await product.save();

      return res.status(200).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteProduct(req: AuthenticatedRequest, res: Response) {
    const productId = req.params.id;
    const userId = req.user?.userId;
    
    if (userId === undefined) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.userId !== userId) {
        return res.status(403).json({ message: 'Unauthorized: You do not own this product' });
      }

      await product.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error
    }
  
}
}
export default ProductController;