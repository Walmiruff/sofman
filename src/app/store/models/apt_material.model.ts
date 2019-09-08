export interface IAptMaterial {
    id: string | number;
    codigo: number;
    data: string | Date;
    fk: number;
    descricao: string;
    quantidade: number;
    valor: string;
    n_serie_antiga: string;
    n_serie_novo: string;
}
