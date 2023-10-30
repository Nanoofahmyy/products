import express, { Application, Request, Response } from 'express';
import sequelize from './models/index'; // Import your Sequelize setup
import UserRoutes from './routes/user.routes';
import ProductRoutes from './routes/product.routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', UserRoutes);
app.use('/products', ProductRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
