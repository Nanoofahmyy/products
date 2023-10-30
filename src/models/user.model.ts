import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { Product } from './product.model';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(() => Product)
  products!: Product[];
}
