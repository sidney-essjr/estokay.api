import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Voluntarios' })
export class Voluntario {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 63 })
  nome: string;

  @Column({ length: 127, unique: true })
  @Index()
  email: string;

  @Column({ nullable: true })
  telefone: string;

  @Column({ unique: true })
  documento: string;

  @Column()
  senha: string;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @Column({ enum: [1, 2], default: 1 })
  funcao: number;

  @CreateDateColumn()
  criado: string;

  @UpdateDateColumn()
  modificado: string;
}
