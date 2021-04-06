import { IButton } from './button.model';

export interface ICardChild {
    cards_array: Card[];
}
  
export class CardChild implements ICardChild {
    public cards_array: Card[];
    constructor(data?: Card[]) {
        this.cards_array = this.returnNewCard(data);
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
    img_url?: string;
    active?: boolean;
    activeSubtitlePanel?: boolean;
    activeTitlePanel?: boolean;
    buttons?: IButton[];
}
  
export class Card implements ICard {
    public title?: string;
    public subtitle?: string;
    public img_url?: string;
    public active?: boolean;
    public activeSubtitlePanel?: boolean;
    public activeTitlePanel?: boolean;
    public buttons?: IButton[];

    constructor(data?: Card) {
        this.title = data.hasOwnProperty('title') ? data.title : '';
        this.subtitle = data.hasOwnProperty('subtitle') ? data.subtitle : '';
        this.img_url = data.hasOwnProperty('img_url') ? data.img_url : '';
        this.active = data.hasOwnProperty('active') ? data.active : true;
        this.buttons = data.hasOwnProperty('buttons') ? data.buttons : [];
        this.activeSubtitlePanel = data.hasOwnProperty('activeSubtitlePanel') ? data.activeSubtitlePanel : false;
        this.activeTitlePanel = data.hasOwnProperty('activeTitlePanel') ? data.activeTitlePanel : false;
    }
}