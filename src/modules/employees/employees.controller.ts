import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { HttpResponse } from 'src/core/interfaces/http-response.interface';
import { ValidateIdPipe } from 'src/core/pipes/validate-id.pipe';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiBody({ type: CreateEmployeeDto })
  @ApiCreatedResponse({ type: Employee })
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<HttpResponse<Employee>> {
    return {
      data: await this.employeesService.create(createEmployeeDto),
    };
  }

  @Get()
  @ApiOkResponse({ type: [Employee] })
  async findAll(): Promise<HttpResponse<Employee[]>> {
    return {
      data: await this.employeesService.findAll(),
    };
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Employee })
  @ApiForbiddenResponse({ description: '`employee not found`' })
  async findOne(
    @Param('id', ValidateIdPipe) id: string,
  ): Promise<HttpResponse<Employee>> {
    return {
      data: await this.employeesService.findOne(+id),
    };
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Employee })
  @ApiForbiddenResponse({
    description: '`employee not found` `employee not modified`',
  })
  async update(
    @Param('id', ValidateIdPipe) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<HttpResponse<Employee>> {
    return {
      data: await this.employeesService.update(+id, updateEmployeeDto),
    };
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse()
  @ApiForbiddenResponse({
    description: '`employee not found` `employee not deleted`',
  })
  async remove(
    @Param('id', ValidateIdPipe) id: string,
  ): Promise<HttpResponse<undefined>> {
    await this.employeesService.remove(+id);
    return {};
  }
}
