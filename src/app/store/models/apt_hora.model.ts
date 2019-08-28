export interface IAptHora {
    id: number;
    fk: number;
    colaborador: string;
    descricao: string;
    data_inicial: string | Date;
    data_final: string | Date;
    status: string;
}
