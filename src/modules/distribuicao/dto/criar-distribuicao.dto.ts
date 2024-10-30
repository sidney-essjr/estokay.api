import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { IsCPF } from 'src/common/decorators/cpf.validator';

class ItemDistribuicaoDTO {
  @IsNumber()
  itemDoacao: number;
  @IsNumber()
  quantidade: number;
}

export class CriarDistribuicaoDTO {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  nome: string;

  @IsCPF()
  @IsNotEmpty()
  documento: string;

  @IsNotEmpty()
  itemDistribuicao: ItemDistribuicaoDTO[];
}
