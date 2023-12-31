import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vacancy } from '../../vacancies/entities/vacancy.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 15,
    unique: true,
    nullable: false,
    collation: 'C',
  })
  public userName: string;

  @Column({ type: 'varchar', unique: true, nullable: false, collation: 'C' })
  public email: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  public phone: string | null;

  @CreateDateColumn()
  public createdAt: string;

  // @OneToMany(() => Vacancy, (v) => v.publisherId)
  @OneToMany(() => Vacancy, (v) => v.publisher)
  vacancies: Vacancy[];
}
