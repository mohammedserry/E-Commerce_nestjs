import { Column, Entity, OneToOne } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'shippings' })
export class ShippingEntity {
  @Column({ primary: true, generated: 'uuid' })
  id: string;

  @Column()
  phone: string;

  @Column({ default: ' ' })
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  postCode: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @OneToOne(() => OrderEntity, (order) => order.shippingAddress)
  order: OrderEntity;
}
