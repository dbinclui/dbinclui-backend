import { ObjectId } from 'mongoose';
import {Guides } from './guides';

export interface Categories {

  _id: ObjectId;
  _id_Guides:  ObjectId;
  title: string;
  content: string;
  }

/** 
Código: Deve ser numérico e sequencial, único no sistema - chave primária; - obrigatório
Guia: campo de seleção para escolher o guia a que esta categoria pertence. - obrigatório
Categoria: descrição curta da categoria que está sendo criada. - obrigatório
Descrição: texto para descrição da categoria criada.*/