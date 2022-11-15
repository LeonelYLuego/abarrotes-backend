import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Provider } from './entities/provider.entity';
import { HttpResponse } from 'src/core/interfaces/http-response.interface';
import { ValidateIdPipe } from 'src/core/pipes/validate-id.pipe';

@ApiTags('Providers')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @ApiBody({ type: CreateProviderDto })
  @ApiCreatedResponse({ type: Provider })
  async create(
    @Body() createProviderDto: CreateProviderDto,
  ): Promise<HttpResponse<Provider>> {
    return {
      data: await this.providersService.create(createProviderDto),
    };
  }

  @Get()
  @ApiOkResponse({ type: [Provider] })
  async findAll(): Promise<HttpResponse<Provider[]>> {
    return {
      data: await this.providersService.findAll(),
    };
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Provider })
  @ApiForbiddenResponse({ description: '`provider not found`' })
  async findOne(
    @Param('id', ValidateIdPipe) id: string,
  ): Promise<HttpResponse<Provider>> {
    return {
      data: await this.providersService.findOne(+id),
    };
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateProviderDto })
  @ApiOkResponse({ type: Provider })
  @ApiForbiddenResponse({
    description: '`provider not found` `provider not modified`',
  })
  async update(
    @Param('id', ValidateIdPipe) id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ): Promise<HttpResponse<Provider>> {
    return {
      data: await this.providersService.update(+id, updateProviderDto),
    };
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse()
  @ApiForbiddenResponse({
    description: '`provider not found` `provider not deleted`',
  })
  async remove(
    @Param('id', ValidateIdPipe) id: string,
  ): Promise<HttpResponse<undefined>> {
    await this.providersService.remove(+id);
    return {};
  }
}
