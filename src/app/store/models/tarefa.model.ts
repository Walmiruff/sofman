export interface ITarefa {
  id: string | number;
  fk: number;
  tarefa: string;
  retorno_alfanumerico: string | number;
  retorno_numerico: string | number;
  legenda: string;
}
