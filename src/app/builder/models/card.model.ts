import { IButton } from './button.model';

export interface ICardChild {
    cardsArray: Card[];
}
  
export class CardChild implements ICardChild {
    public cardsArray: Card[];
    constructor(data?: Card[]) {
        this.cardsArray = this.returnNewCard(data);
    }
  
    private returnNewCard(cards) {
        const arr = Array();
        cards.forEach((card) => {
            arr.push(new Card(card));
        });
        return arr;
    }
}
  
export interface ICard {
    title?: string;
    subtitle?: string;
    imgUrl?: string;
    active?: boolean;
    activeSubtitlePanel?: boolean;
    activeTitlePanel?: boolean;
    buttons?: IButton[];
}
  
export class Card implements ICard {
    public title?: string;
    public subtitle?: string;
    public imgUrl?: string;
    public active?: boolean;
    public activeSubtitlePanel?: boolean;
    public activeTitlePanel?: boolean;
    public buttons?: IButton[];

    constructor(data?: Card) {
        this.title = data.hasOwnProperty('title') ? data.title : '';
        this.subtitle = data.hasOwnProperty('subtitle') ? data.subtitle : '';
        this.imgUrl = data.hasOwnProperty('imgUrl') ? data.imgUrl : '';
        this.active = data.hasOwnProperty('active') ? data.active : true;
        this.buttons = data.hasOwnProperty('buttons') ? data.buttons : [];
        this.activeSubtitlePanel = data.hasOwnProperty('activeSubtitlePanel') ? data.activeSubtitlePanel : false;
        this.activeTitlePanel = data.hasOwnProperty('activeTitlePanel') ? data.activeTitlePanel : false;
    }
}