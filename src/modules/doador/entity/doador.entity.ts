import { Doacao } from 'src/modules/doacao/entity/doacao.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Doadores' })
export class Doador {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 63 })
  nome: string;

  @Column({ nullable: true })
  telefone: string;

  @Column({ nullable: true, length: 127 })
  endereco: string;

  @Column({ nullable: true, length: 100 })
  bairro: string;

  @Column({ length: 100 })
  cidade: string;

  @Column({ length: 63 })
  estado: string;

  @OneToMany(() => Doacao, (doacoes) => doacoes.doador, {
    onDelete: 'CASCADE', // remove os itens ao deletar a doação
  })
  doacoes: Doacao[];
}
