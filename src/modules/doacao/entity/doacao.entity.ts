import { Doador } from 'src/modules/doador/entity/doador.entity';
import { Voluntario } from 'src/modules/voluntario/entity/voluntario.entity';
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

  @ManyToOne(() => Voluntario, (voluntario) => voluntario.doacoes)
  voluntario: Voluntario;

  @CreateDateColumn()
  criado: string;

  @UpdateDateColumn()
  modificado: string;
}
