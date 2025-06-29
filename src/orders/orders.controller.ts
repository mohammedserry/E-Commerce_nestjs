import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { AuthorizationGuard } from 'src/utility/guards/authorization.guard';
import { AuthroizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<{
    status: string;
    statusCode: number;
    data: OrderEntity;
  }> {
    return await this.ordersService.create(createOrderDto, currentUser);
  }

  @Get()
  async findAll(): Promise<{
    count: number;
    statusCode: number;
    data: OrderEntity[];
  }> {
    return await this.ordersService.findAll();
  }

  @Get(':orderId')
  async findOne(@Param('orderId') orderId: string): Promise<{
    status: string;
    statusCode: number;
    data: OrderEntity;
  }> {
    return await this.ordersService.findOne(orderId);
  }

  @Put(':orderId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @AuthroizeRoles(Roles.ADMIN)
  async update(
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.ordersService.update(
      orderId,
      updateOrderStatusDto,
      currentUser,
    );
  }

  @Put('cancel/:orderId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @AuthroizeRoles(Roles.ADMIN)
  async cancelled(
    @Param('orderId') orderId: string,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.ordersService.cancelled(
      orderId,
      currentUser,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
