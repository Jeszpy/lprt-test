import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
