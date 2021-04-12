import { Injectable } from '@angular/core';
import { IListItem } from '../models/list-items.model';

@Injectable()
export class SettingsService {
    public listMainItems: IListItem[] = [
        {
          name: 'Send Message',
          type: 'sendMessage',
          icon: '../../../../../assets/img/sendMessage.svg'
        },
        {
          name: 'Randomizer',
          type: 'randomizer',
          icon: '../../../../../assets/img/randomizer.svg'
        },
    ];

    constructor() {}
}