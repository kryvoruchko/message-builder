import { builderUUID } from '../core/utils/uuid-generator';
import { Arrow, IArrow } from './arrow.model';
import { IButton } from './button.model';

export interface IRandomizer {
    randomData?: IRandom[];
}
  
export class Randomizer implements IRandomizer {
    public randomData?: IRandom[];

    constructor(data?: IRandomizer) {
        this.randomData = data.hasOwnProperty('randomData') ? data.randomData : [];
    }
}
  
export interface IRandom {
    uuid?: string;
    value?: number;
    random_leter?: string;
    next_step?: string;
    arrow?: {
        from?: IArrow,
        to?: IArrow
    };
}
  
export class Random implements IRandom {
    public uuid?: string;
    public value?: number;
    public random_leter?: string;
    public next_step?: string;
    public arrow?: {
        from?: IArrow,
        to?: IArrow
    };

    constructor(data?: IRandom) {
        this.uuid = data.hasOwnProperty('uuid') ? data.uuid : builderUUID();
        this.value = data.hasOwnProperty('value') ? data.value : 50;
        this.random_leter = data.hasOwnProperty('random_leter') ? data.random_leter : 'A';
        this.next_step = data.hasOwnProperty('next_step') ? data.next_step : null;
        this.arrow  = this.createArrowObj(data);
    }
  
    private createArrowObj (data?: IButton): any {
      const toArrowData = data.hasOwnProperty('arrow') ? data.arrow.to : null;
      const fromArrowData = data.hasOwnProperty('arrow') ? data.arrow.from : null;
      return { from: new Arrow(fromArrowData), to: new Arrow(toArrowData) };
    }
}