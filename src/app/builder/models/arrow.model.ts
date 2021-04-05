export interface IArrow {
    id?: string;
    toItemX?: number;
    toItemY?: number;
    fromItemX?: number;
    fromItemY?: number;
}
  
export class Arrow implements IArrow {
    public id?: string;
    public toItemX?: number;
    public toItemY?: number;
    public fromItemX?: number;
    public fromItemY?: number;

    constructor (data?: IArrow) {
        this.id = data ? data.id : null;
        this.toItemX = data ? data.hasOwnProperty('toItemX') ? data.toItemX : null : null;
        this.toItemY = data ? data.hasOwnProperty('toItemY') ? data.toItemY : null : null;
        this.fromItemX = data ? data.hasOwnProperty('fromItemX') ? data.fromItemX : null : null;
        this.fromItemY = data ? data.hasOwnProperty('fromItemY') ? data.fromItemY : null : null;
    }
}