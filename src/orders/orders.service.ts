import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from './enums/order-status.enum';
import dataSource from 'db/data-source';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrdersProductsEntity)
    private readonly opRepository: Repository<OrdersProductsEntity>,
    private readonly productService: ProductsService,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    currentUser: UserEntity,
  ): Promise<{
    status: string;
    statusCode: number;
    data: OrderEntity;
  }> {
    const shippingEntity = new ShippingEntity();
    Object.assign(shippingEntity, createOrderDto.shippingAddress);

    const orderEntity = new OrderEntity();
    orderEntity.shippingAddress = shippingEntity;
    orderEntity.user = currentUser;

    const orderTbl = await this.orderRepository.save(orderEntity);

    let opEntity: {
      order: OrderEntity;
      product: ProductEntity;
      product_quantity: number;
      product_unit_price: number;
    }[] = [];

    for (let i = 0; i < createOrderDto.orderedProducts.length; i++) {
      const order = orderTbl;
      const product = await this.productService.findOne(
        createOrderDto.orderedProducts[i].id,
      );
      const product_quantity =
        createOrderDto.orderedProducts[i].product_quantity;
      const product_unit_price =
        createOrderDto.orderedProducts[i].product_unit_price;

      opEntity.push({
        order,
        product: product.data,
        product_quantity,
        product_unit_price,
      });
    }

    const op = await this.opRepository
      .createQueryBuilder()
      .insert()
      .into(OrdersProductsEntity)
      .values(opEntity)
      .execute();

    const savedOrder = await this.findOne(orderTbl.id);
    return {
      status: 'Success',
      statusCode: 201,
      data: savedOrder.data,
    };
  }

  async findAll(): Promise<{
    count: number;
    statusCode: number;
    data: OrderEntity[];
  }> {
    const orders = await this.orderRepository.find({
      relations: {
        shippingAddress: true,
        user: true,
        products: {
          product: true,
        },
      },
    });

    return {
      count: orders.length,
      statusCode: 200,
      data: orders,
    };
  }

  async findOne(orderId: string): Promise<{
    status: string;
    statusCode: number;
    data: OrderEntity;
  }> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: {
        shippingAddress: true,
        user: true,
        products: {
          product: true,
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return {
      status: 'Success',
      statusCode: 200,
      data: order,
    };
  }

  async update(
    orderId: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
    currentUser: UserEntity,
  ): Promise<{
    status: string;
    statusCode: number;
    data: OrderEntity;
  }> {
    let order = await this.findOne(orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    if (
      order.data.status === OrderStatus.DELIVERED ||
      order.data.status === OrderStatus.CANCELLED
    ) {
      throw new BadRequestException(`Order already ${order.data.status}`);
    }

    if (
      order.data.status === OrderStatus.PROCESSING &&
      updateOrderStatusDto.status != OrderStatus.SHIPPED
    ) {
      throw new BadRequestException(`Delivery before shipped !!!!`);
    }

    if (
      updateOrderStatusDto.status === OrderStatus.SHIPPED &&
      order.data.status === OrderStatus.SHIPPED
    ) {
      return order;
    }

    if (updateOrderStatusDto.status === OrderStatus.SHIPPED) {
      order.data.shippedAt = new Date();
    }

    if (updateOrderStatusDto.status === OrderStatus.DELIVERED) {
      order.data.deliveredAt = new Date();
    }

    order.data.status = updateOrderStatusDto.status;
    order.data.updatedBy = currentUser;
    order.data = await this.orderRepository.save(order.data);

    if (updateOrderStatusDto.status === OrderStatus.DELIVERED) {
      await this.stockUpdate(order.data, OrderStatus.DELIVERED);
    }

    return {
      status: 'Success',
      statusCode: 200,
      data: order.data,
    };
  }

  async cancelled(
    orderId: string,
    currentUser: UserEntity,
  ): Promise<
    | OrderEntity
    | {
        status: string;
        statusCode: number;
        data: OrderEntity;
      }
  > {
    let order = await this.findOne(orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    if (order.data.status === OrderStatus.CANCELLED) {
      return order.data;
    }

    order.data.status = OrderStatus.CANCELLED;
    order.data.updatedBy = currentUser;
    order.data = await this.orderRepository.save(order.data);
    await this.stockUpdate(order.data, OrderStatus.CANCELLED);

    return {
      status: 'Success',
      statusCode: 200,
      data: order.data,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async stockUpdate(order: OrderEntity, status: string) {
    for (const op of order.products) {
      await this.productService.updateStock(
        op.product.id,
        op.product_quantity,
        status,
      );
    }
  }
}
