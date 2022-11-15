import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Provider {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 64 })
  name: string;

  @ApiProperty()
  @Column({ length: 64 })
  denomination: string;

  @ApiProperty()
  @Column({ length: 64 })
  remittance: string;
}
