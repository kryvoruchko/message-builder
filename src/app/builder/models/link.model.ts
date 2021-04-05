import { IArrow } from './arrow.model';

export interface ILink {
    to: string,
    toArr: ILinkItem[],
}

export interface ILinkItem {
    fromObj: IArrow,
    toObj: IArrow,
}
