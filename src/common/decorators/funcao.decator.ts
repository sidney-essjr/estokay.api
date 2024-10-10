import { SetMetadata } from '@nestjs/common';
import { FuncaoEnum } from '../enums/funcao.enum';

export const KEY_FUNCAO = 'funcao';
export const Funcoes = (...funcoes: FuncaoEnum[]) =>
  SetMetadata(KEY_FUNCAO, funcoes);
