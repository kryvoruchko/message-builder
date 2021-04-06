export function scalingRange(
    max: number,
    min: number,
    step: number = 1
): number[] {
    const arr = [];
    for(let i = min; i <= max; i += step) {
        arr.push(+i.toFixed(2));
    }
    arr.push(max);

    return arr.reverse();
}