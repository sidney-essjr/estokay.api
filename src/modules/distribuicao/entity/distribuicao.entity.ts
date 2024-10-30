import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemDistribuicao } from './item-distribuicao.entity';
import { Voluntario } from 'src/modules/voluntario/entity/voluntario.entity';

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

  @ManyToOne(() => Voluntario, (voluntario) => voluntario.distribuicoes)
  voluntario: Voluntario;

  @CreateDateColumn()
  criado: string;
}
