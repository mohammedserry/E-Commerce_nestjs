import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { OrderStatus } from 'src/orders/enums/order-status.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    currentUser: UserEntity,
  ): Promise<{
    status: string;
    statusCode: number;
    data: ProductEntity;
  }> {
    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createProductDto.categoryId} not found`,
      );
    }
    const product = this.productRepository.create(createProductDto);
    product.category = category.data;
    product.addedBy = currentUser;

    const savedProduct = await this.productRepository.save(product);

    return {
      status: 'Success',
      statusCode: 201,
      data: savedProduct,
    };
  }

  async findAll(): Promise<{
    count: number;
    statusCode: number;
    data: ProductEntity[];
  }> {
    const products = await this.productRepository.find();

    return {
      count: products.length,
      statusCode: 200,
      data: products,
    };
  }

  async findOne(productId: string): Promise<{
    status: string;
    statusCode: number;
    data: ProductEntity;
  }> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: {
        category: true,
        addedBy: true,
      },
      select: {
        addedBy: {
          id: true,
          name: true,
          email: true,
        },
        category: {
          id: true,
          title: true,
        },
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return {
      status: 'Success',
      statusCode: 200,
      data: product,
    };
  }

  async update(
    productId: string,
    updateProductDto: Partial<UpdateProductDto>,
    currentUser: UserEntity,
  ): Promise<{
    status: string;
    statusCode: number;
    data: ProductEntity;
  }> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    Object.assign(product, updateProductDto);
    product.addedBy = currentUser;
    if (updateProductDto.categoryId) {
      const category = await this.categoryService.findOne(
        updateProductDto.categoryId,
      );
      product.category = category.data;
    }

    const updatedProduct = await this.productRepository.save(product);

    return {
      status: 'Success',
      statusCode: 200,
      data: updatedProduct,
    };
  }

  async remove(productId: string): Promise<{
    statusCode: number;
    status: string;
    message: string;
  }> {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    await this.productRepository.delete(productId);

    return {
      statusCode: 200,
      status: 'Success',
      message: 'Product deleted successfully',
    };
  }

  async updateStock(productId: string, stock: number, status: string) {
    let product = await this.findOne(productId);
    if (status === OrderStatus.DELIVERED) {
      product.data.stock -= stock;
    } else {
      product.data.stock += stock;
    }

    product.data = await this.productRepository.save(product.data);

    return product;
  }
}
