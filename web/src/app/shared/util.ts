
const decCases = [2, 0, 1, 1, 1, 2];

export function decOfNum(num:number, titles:string[]):string {
    let decCache = [];

    if(!decCache[num]) decCache[num] = num % 100 > 4 && num % 100 < 20 ? 2 : decCases[Math.min(num % 10, 5)];
    return titles[decCache[num]];
}
