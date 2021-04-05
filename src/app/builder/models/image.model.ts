import { IButton } from './button.model';

export interface IImage {
    img_url?: string;
    buttons?: IButton[];
}
  
export class Image implements IImage {
    public img_url?: string;
    public buttons?: IButton[];

    constructor(data?: IImage) {
        this.img_url = data.hasOwnProperty('img_url') ? data.img_url : '';
        this.buttons = data.hasOwnProperty('buttons') ? data.buttons : [];
    }
}