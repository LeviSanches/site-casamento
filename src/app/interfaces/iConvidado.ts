import { IAcompanhante } from "./iAcompanhante";

export interface IConvidado {
    id?: number,
    nome: string | null,
    email: string | null,
    statusPresenca: boolean,
    acompanhantes?: IAcompanhante[];
}