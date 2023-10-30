import { Sequelize } from 'sequelize-typescript';
import { Product } from './product.model'; 
import { User } from './user.model'; 

const sequelize = new Sequelize({
  dialect: 'postgres', 
  database: 'product',
  username: 'postgres',
  password: '123456789',
  host: 'localhost',
  port:5432,
  
  models: [User, Product], 
});
sequelize.sync(); 
export default sequelize;
