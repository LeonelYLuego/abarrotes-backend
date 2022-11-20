import { forwardRef, Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Employee]), forwardRef(() => AuthModule)],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
