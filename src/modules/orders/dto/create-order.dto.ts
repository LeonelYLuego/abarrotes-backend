import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDefined } from "class-validator";
import { Client } from "src/modules/clients";

export class CreateOrderDto {
  @ApiProperty()
  @IsDefined()
  @IsDateString()
  date: Date;

  @ApiProperty()
  comments: string;

  @ApiProperty()
  status: string;               

  @ApiProperty()
  client: number | Client;
}
