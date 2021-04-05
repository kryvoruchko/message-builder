import { IButton } from './button.model';

export interface IText {
    description?: string;
    buttons?: IButton[];
}
  
export class Text implements IText {
    public description?: string;
    public buttons?: IButton[];

    constructor(data?: IText) {
        this.description = data.hasOwnProperty('description') ? data.description : '';
        this.buttons = data.hasOwnProperty('buttons') ? data.buttons : [];
    }
}