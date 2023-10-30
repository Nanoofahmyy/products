import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Product extends Model {
  @Column(DataType.STRING) 
  title!: string;

  @Column(DataType.STRING)
  image!: string;

  @Column(DataType.FLOAT)
  price!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
