import { createArrowObj } from '../core/utils/create-arrow';
import { builderUUID } from '../core/utils/uuid-generator';
import { IArrow } from './arrow.model';

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
    randomLeter?: string;
    nextStep?: string;
    arrow?: {
        from?: IArrow,
        to?: IArrow
    };
}
  
export class Random implements IRandom {
    public uuid?: string;
    public value?: number;
    public randomLeter?: string;
    public nextStep?: string;
    public arrow?: {
        from?: IArrow,
        to?: IArrow
    };

    constructor(data?: IRandom) {
        this.uuid = data.hasOwnProperty('uuid') ? data.uuid : builderUUID();
        this.value = data.hasOwnProperty('value') ? data.value : 50;
        this.randomLeter = data.hasOwnProperty('randomLeter') ? data.randomLeter : 'A';
        this.nextStep = data.hasOwnProperty('nextStep') ? data.nextStep : null;
        this.arrow  = createArrowObj(data);
    }
}