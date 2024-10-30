import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemDistribuicao } from './item-distribuicao.entity';

@Entity({ name: 'Distribuicoes' })
export class Distribuicao {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 63 })
  nomeBeneficiario: string;

  @Column()
  documento: string;

  @OneToMany(
    () => ItemDistribuicao,
    (itensDistribuicao) => itensDistribuicao.distribuicao,
  )
  itensDistribuicao: ItemDistribuicao[];

  @CreateDateColumn()
  criado: string;
}
