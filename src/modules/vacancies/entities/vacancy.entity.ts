import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', collation: 'C', nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 300, collation: 'C', nullable: false })
  shortDescription: string;

  @Column({ type: 'varchar', array: true, collation: 'C', nullable: false })
  skills: string[];

  @ManyToOne(() => User, (u) => u.vacancies)
  @JoinColumn({ name: 'publisher_id' })
  publisherId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
