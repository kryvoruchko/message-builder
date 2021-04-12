import { IButton } from './button.model';

export interface IImage {
    imgUrl?: string;
    buttons?: IButton[];
}
  
export class Image implements IImage {
    public imgUrl?: string;
    public buttons?: IButton[];

    constructor(data?: IImage) {
        this.imgUrl = data.hasOwnProperty('imgUrl') ? data.imgUrl : '';
        this.buttons = data.hasOwnProperty('buttons') ? data.buttons : [];
    }
}