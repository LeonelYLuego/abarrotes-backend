import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LogInDto {
    @ApiProperty()
    @IsDefined()
    @IsString()
    @IsEmail()
    @MinLength(3)
    @MaxLength(128)
    email: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    @MinLength(3)
    @MaxLength(64)
    password: string;
}