export interface IOrdem {
      id: number;
      filial: string;
      ordem:  string |number;
      data: string | Date;
      equipamento: string;
      tipo_de_mnt: string;
      descricao: string;
      solicitante?: string;
      data_prog?: string | Date;
      data_solic?: string | Date;
      setor_solic?: string;
      observacao?: string;
      status_da_os?: string;
}

