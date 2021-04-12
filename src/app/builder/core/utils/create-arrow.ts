import { Arrow } from '../../models/arrow.model';

export function createArrowObj(data?: any): any {
    const toArrowData = data.hasOwnProperty('arrow') ? data.arrow.to : null;
    const fromArrowData = data.hasOwnProperty('arrow') ? data.arrow.from : null;
    return { from: new Arrow(fromArrowData), to: new Arrow(toArrowData) };
}