import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    return await this.providersRepository.save(createProviderDto);
  }

  async findAll(): Promise<Provider[]> {
    return await this.providersRepository.find({});
  }

  async findOne(id: number): Promise<Provider> {
    const provider = await this.providersRepository.findOne({ where: { id } });
    if (!provider) throw new ForbiddenException('provider not found');
    return provider;
  }

  async update(
    id: number,
    updateProviderDto: UpdateProviderDto,
  ): Promise<Provider> {
    await this.findOne(id);
    if (
      (await this.providersRepository.update({ id }, updateProviderDto))
        .affected == 0
    )
      throw new ForbiddenException('provider not modified');
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    if ((await this.providersRepository.delete({ id })).affected == 0)
      throw new ForbiddenException('provider not deleted');
  }
}
