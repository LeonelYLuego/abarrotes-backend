import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from '../clients';
import { EmployeesService } from '../employees';
import { LogInDto } from './dto/log-in.dto';
import * as bcrypt from 'bcryptjs';
import { ResponseLogInDto } from './dto/response-log-in.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => EmployeesService))
    private employeesService: EmployeesService,
    @Inject(forwardRef(() => ClientsService))
    private clientsService: ClientsService,
  ) {}

  async login(logInDto: LogInDto): Promise<ResponseLogInDto> {
    const employee = await this.employeesService.findByEmail(logInDto.email);
    if (employee) {
      if (await bcrypt.compare(logInDto.password, employee.password)) {
        return {
          type: employee.administrator ? 'administrator' : 'employee',
          id: employee.id,
          token: this.jwtService.sign({
            type: employee.administrator ? 'administrator' : 'employee',
            id: employee.id,
          }),
        };
      }
    }
    const client = await this.clientsService.findByEmail(logInDto.email);
    if (client) {
      if (bcrypt.compareSync(logInDto.password, client.password)) {
        return {
          type: 'client',
          id: client.id,
          token: this.jwtService.sign({
            type: 'client',
            id: client.id,
          }),
        };
      }
    }
    throw new UnauthorizedException();
  }

  async authenticate(token: string): Promise<UserDto | null> {
    if (token) {
      try {
        const payload = (await this.jwtService.verify(
          token,
        )) as ResponseLogInDto;
        if (payload.type == 'administrator' || payload.type == 'employee') {
          const employee = await this.employeesService.findOne(payload.id);
          if (
            (employee.administrator && payload.type == 'administrator') ||
            (!employee.administrator && payload.type == 'employee')
          )
            return {
              type: payload.type,
              user: employee,
            };
        } else {
          return {
            type: payload.type,
            user: await this.clientsService.findOne(payload.id),
          };
        }
      } catch {
        return null;
      }
    }
    return null;
  }
}
