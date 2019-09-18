export interface IOrdem {
      id?: string | number;
      ordem?: string |number;
      equipamento?: string;
      tipo_manutencao?: string;
      id_filial?: string | number;
      solicitante?: string;
      filial?: string;
      data?: string | Date;
      data_programada?: string | Date;
      data_solicitada?: string | Date;
      setor_solicitante?: string;
      status_os?: string;
      observacoes?: string;
      descricao_solicitacao?: string;
      message?: string;
      signaturecliente?: string;
      signaturefuncionario?: string;
}
