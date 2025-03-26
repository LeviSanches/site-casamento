import { IListaPresentes } from "./iListaPresentes";

export interface IPagamento {
    idPagamento?: number,
    nomeConvidado: string,
    email: string,
    telefone: string,
    status?: string | null,
    mensagem?: string | null,
    produtos?: IListaPresentes[]
}