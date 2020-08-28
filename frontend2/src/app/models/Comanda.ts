import { ComandaItem } from './ComandaItem';

export interface Comanda {
    codigoComanda: number;
    situacao: string;
    valorTotal: number;
    desconto: number;
    dataAberturaComanda: Date;
    dataFechamentoComanda: Date;
    listaItem: ComandaItem[];
}