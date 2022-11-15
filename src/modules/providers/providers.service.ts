import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  create(createProviderDto: CreateProviderDto) {
    return null;
  }

  findAll() {
    return null;
  }

  async findOne(id: number): Promise<Provider> {
    return null;
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return null;
  }

  remove(id: number) {
    return null;
  }
}
