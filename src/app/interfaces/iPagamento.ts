import { IListaPresentes } from "./iListaPresentes";

export interface IPagamento {
    idPagamento?: number,
    nomeConvidado: string,
    email: string,
    produto: IListaPresentes[]
}