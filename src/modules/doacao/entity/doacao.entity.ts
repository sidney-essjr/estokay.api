import { Doador } from 'src/modules/doador/entity/doador.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ItemDoacao } from './item-doacao.entity';

@Entity({ name: 'Doacoes' })
export class Doacao {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ManyToOne(() => Doador, (doador) => doador.doacoes)
  doador: Doador;

  @Column({ type: 'date' })
  dataEntrada: Date;

  @OneToMany(() => ItemDoacao, (itens) => itens.doacao, {
    cascade: true, // permite inserir itens automaticamente ao salvar a doação
  })
  itens: ItemDoacao[];

  @CreateDateColumn()
  criado: string;

  @UpdateDateColumn()
  modificado: string;
}
