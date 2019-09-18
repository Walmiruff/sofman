export interface IOrdem {
  data: string | Date;
  data_programada?: string | Date;
  data_solicitada?: string | Date;
  equipamento: string;
  filial: string;
  id: string | number;
  id_filial: string | number;
  message?: string;
  observacoes?: string;
  ordem: string | number;
  setor_solicitante: string;
  solicitante?: string;
  tipo_manutencao: string;
  descricao: string;
  setor_solic?: string;
  status_os?: string;
}
