import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name: "reviews"})
export class ReviewEntity {
  @Column({ primary: true, generated: 'uuid' })
  id: string;

  @Column()
  ratings: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(type => UserEntity, (user) => user.reviews)
  user: UserEntity;

  @ManyToOne(type => ProductEntity, (prod) => prod.reviews)
  product: ProductEntity;
}
