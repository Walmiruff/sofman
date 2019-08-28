import { IOrdem } from './ordem.model';
import { IAptMaterial } from './apt_material.model';
import { IAptHora } from './apt_hora.model';
import { IImg } from './img.model';
import { ITarefa } from './tarefa.model';

export interface AppState {
    readonly ordem: IOrdem[];
    readonly material: IAptMaterial[];
    readonly hora: IAptHora[];
    readonly img: IImg[];
    readonly tarefa: ITarefa[]; 
}
