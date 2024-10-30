import { ItemDistribuicao } from 'src/modules/distribuicao/entity/item-distribuicao.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Estoque' })
export class Estoque {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 127 })
  descricao: string;

  @Column()
  quantidade: number;

  @Column()
  categoria: string;

  @Column({ nullable: true })
  tamanho: string;

  @Column()
  medida: string;

  @Column({ nullable: true, type: 'date' })
  validade: Date;

  @OneToMany(
    () => ItemDistribuicao,
    (itensDistribuicao) => itensDistribuicao.itemEstoque,
  )
  itensDistribuicao: ItemDistribuicao[];

  @CreateDateColumn()
  criado: string;

  @UpdateDateColumn()
  modificado: string;
}
