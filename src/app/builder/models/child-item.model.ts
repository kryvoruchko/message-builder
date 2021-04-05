import { builderUUID } from '../core/utils/uuid-generator';
import { ICardChild } from './card.model';
import { IImage } from './image.model';
import { IText, Text } from './text.model';

export interface IChild {
    uuid?: string;
    type?: string;
    params?: IText | IImage | ICardChild;
}
  
export class Child implements IChild {
    public uuid?: string;
    public type?: string;
    public params?: IText | IImage | ICardChild;

    constructor(data?: Child) {
        this.uuid = data.hasOwnProperty('uuid') ? data.uuid : builderUUID();
        this.type = data.hasOwnProperty('type') ? data.type : 'text';
        this.params = data.hasOwnProperty('params') ? data.params : new Text({});
    }
}