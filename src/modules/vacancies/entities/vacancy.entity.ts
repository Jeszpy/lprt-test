import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export interface IVacancyCreateAttr {
  title: string;
  shortDescription: string;
  skills: string[];
  publisher: User;
}

export interface IVacancyViewModel {
  id: string;
  title: string;
  shortDescription: string;
  skills: string[];
  publisher: {
    id: string;
    userName: string;
    email: string;
    phone: string | null;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, collation: 'C', nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 300, collation: 'C', nullable: false })
  shortDescription: string;

  @Column({ type: 'varchar', array: true, collation: 'C', nullable: false })
  skills: string[];

  @ManyToOne(() => User, (u) => u.vacancies, { cascade: true, eager: true })
  // @JoinColumn({ name: 'publisher_id' })
  // publisherId: string;
  publisher: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  public getViewModel(): IVacancyViewModel {
    return {
      id: this.id,
      title: this.title,
      shortDescription: this.shortDescription,
      skills: this.skills,
      publisher: {
        id: this.publisher.id,
        userName: this.publisher.userName,
        email: this.publisher.email,
        phone: this.publisher.phone,
        createdAt: this.publisher.createdAt,
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
