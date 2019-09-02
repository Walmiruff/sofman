import { IOrdem } from './ordem.model';
import { IAptMaterial } from './apt_material.model';
import { IAptHora } from './apt_hora.model';
import { IImg } from './img.model';
import { ITarefa } from './tarefa.model';

export interface AppState {
    readonly ordens: IOrdem[];
    readonly materiais: IAptMaterial[];
    readonly horas: IAptHora[];
    readonly imgs: IImg[];
    readonly tarefas: ITarefa[]; 
}
