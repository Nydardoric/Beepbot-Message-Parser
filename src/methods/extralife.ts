import { IMessage } from '../interface';
import { httpRequest } from '../lib/helpers';

export type ExtraLifeType = 'all' | 'goal' | 'total';

interface IAPIData {
    displayName: string;
    fundraisingGoal: number;
    eventName: string;
    links: {
        donate: string;
    };
    sumDonations: number;
    teamName: string;
    sumPledges: number;
    numDonations: number;
}

export async function extralife(_message: IMessage, _settings: any, request: typeof fetch, id: string, type: ExtraLifeType = 'all') {
    const req: IAPIData = await httpRequest(request, `https://www.extra-life.org/api/participants/${id}`);
    if (req === undefined || (<any>req).length === 0) {
        return '[Error: API Error]';
    }

    try {
        switch (type.toLowerCase()) {
            case 'goal':
                return parseNum(req.fundraisingGoal);
            case 'raised':
                return parseNum(req.sumDonations);
            case 'total':
                return `${parseNum(req.sumDonations)} (${totalPercentage(req.fundraisingGoal, req.sumDonations)}%)`;
            case 'all':
            default:
                return `Raised: ${parseNum(req.sumDonations)} Goal: ${parseNum(req.fundraisingGoal)} (${totalPercentage(req.fundraisingGoal, req.sumDonations)}%)`;
        }
    } catch (err) {
        return '[Error: Internal Error]';
    }
}

export function parseNum(num: number, thou = ',', dec = '.', sym = '$') {
    return num.toFixed(2)
        .toString()
        .split(/[-.]/)
        .reverse()
        .reduceRight(
            (t, c, i) => {
                return (i === 1) ? t + c.replace(/(\d)(?=(\d{3})+$)/g, `$1${thou}`) : t + dec + c;
            },
            sym,
        );
}

function totalPercentage(total: number, current: number) {
    // tslint:disable-next-line: binary-expression-operand-order
    return Math.trunc(((100 * current) / total));
}
