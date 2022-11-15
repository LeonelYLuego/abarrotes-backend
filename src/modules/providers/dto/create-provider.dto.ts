import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProviderDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  denomination: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  remittance: string;
}
