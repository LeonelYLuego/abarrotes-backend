import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Client } from '../clients';
import { ProductsService } from '../products';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private productsService: ProductsService,
  ) {}

  async createCart(
    createOrderDto: CreateOrderDto,
    client: Client,
  ): Promise<Order> {
    const product = await this.productsService.findOne(createOrderDto.product);
    return await this.ordersRepository.save({
      cart: new Date(),
      quantity: createOrderDto.quantity,
      client,
      product,
    });
  }

  async findAllInTheCart(client: Client): Promise<Order[]> {
    return await this.ordersRepository.find({
      where: { client, placed: IsNull() },
    });
  }

  async findOne(id: number, client: Client): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id, client },
    });
    if (!order) throw new ForbiddenException('order not found');
    return order;
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
    client: Client,
  ): Promise<Order> {
    const order = await this.findOne(id, client);
    if (order.placed) throw new ForbiddenException('order must be not placed');
    if (
      (await this.ordersRepository.update({ id }, updateOrderDto)).affected == 0
    )
      throw new ForbiddenException('order not modified');
    return await this.findOne(id, client);
  }

  async remove(id: number, client: Client): Promise<void> {
    await this.findOne(id, client);
    if ((await this.ordersRepository.delete({ id })).affected == 0)
      throw new ForbiddenException('order not deleted');
  }
}
