export interface ISolicitation {
  id: string | number;
  tag_id: string | number;
  id_cliente: string | number; //
  id_filial: string | number;
  id_subgrupo: string | number; // Lista suspensa
  id_equipamento: string | number; // lista suspensa
  localizacao: string;
  ordem_servico: string | number;
  id_setor_executante: string | number; // lista suspensa
  id_contato_filial: string | number;
  codigo_solicitacao: string | number;
  categoria: string | number;
  assunto: string;
  mensagem: string;
  prioridade: string;
  status: string | number;
  imagem: string;
  imagem_nome: string;
  imagem_tamanho: string;
  data_inicio: Date | number;
  data_termino: Date | number;
  log_date: Date | number;
  id_problema: string | number; // lista suspensa
  maquina_parada: string | number;
  notificar: string;
}
