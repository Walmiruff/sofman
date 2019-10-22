export interface ISolicitation {
  id: string | number;
  id_cliente?: string | number; //
  id_filial?: string | number; // 
  id_subgrupo?: string | number; // Lista suspensa
  id_equipamento: string | number; // lista suspensa
  localizacao?: string;
  id_setor_executante?: string | number; // lista suspensa
  assunto: string;
  mensagem: string;
  prioridade: string;
  status: string | number; // lista suspensa
  imagem?: string;
  data_inicio?: Date | number;
  data_termino?: Date | number;
  id_problema?: string | number; // lista suspensa
  maquina_parada?: string | number;
}
