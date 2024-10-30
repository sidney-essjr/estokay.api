import { Estoque } from 'src/modules/estoque/entity/estoque.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Distribuicao } from './distribuicao.entity';

@Entity({ name: 'Itens_Distribuicao' })
export class ItemDistribuicao {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @CreateDateColumn()
  data: string;

  @Column()
  quantidade: number;

  @ManyToOne(
    () => Distribuicao,
    (distribuicao) => distribuicao.itensDistribuicao,
  )
  distribuicao: Distribuicao;

  @ManyToOne(() => Estoque, (itemEstoque) => itemEstoque.itensDistribuicao)
  itemEstoque: Estoque;
}
