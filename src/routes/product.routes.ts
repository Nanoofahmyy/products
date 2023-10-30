import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { authenticateToken } from '../middleware/authenticateToken';

const router: Router = Router();
const productController = new ProductController();

router.get('/', authenticateToken , productController.getAllProducts);
router.get('/:id',authenticateToken ,  productController.getProductById);
router.post('/', authenticateToken , productController.createProduct);
router.put('/:id', authenticateToken , productController.updateProduct);
router.delete('/:id', authenticateToken , productController.deleteProduct);

export default router;
