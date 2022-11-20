import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpResponse } from 'src/core/interfaces/http-response.interface';
import { AuthService } from './auth.service';
import { USERS } from './constants/user.constant';
import { Auth, CurrentUser } from './decorators/auth.decorator';
import { LogInDto } from './dto/log-in.dto';
import { ResponseLogInDto } from './dto/response-log-in.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('log-in')
  @ApiBody({ type: LogInDto })
  @ApiCreatedResponse({ type: ResponseLogInDto })
  @ApiUnauthorizedResponse()
  async logIn(
    @Body() logInDto: LogInDto,
  ): Promise<HttpResponse<ResponseLogInDto>> {
    return {
      data: await this.authService.login(logInDto),
    };
  }

  @Get('logged')
  @Auth(USERS.ALL)
  async logged(@CurrentUser() user: UserDto) {
    return user;
  }
}
