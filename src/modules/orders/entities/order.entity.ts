import { Client } from 'src/modules/clients';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'date' })
  date: Date;

  @ApiProperty()
  @Column({ length: 128 })
  comments: string;

  @ApiProperty()
  @Column({ length: 64 })
  status: string;

  @ManyToOne(() => Client, (client) => client.id, { onDelete: 'CASCADE' })
  client: number | Client;
}
