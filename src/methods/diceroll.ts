import { DiceRoll } from '@dice-roller/rpg-dice-roller';

import { ParserContext } from '../';
import { IMessage, ISetting } from '../interface';

export async function diceroll(_message: IMessage, _settings: ISetting, _context: ParserContext, ...roll: string[]) {
    const rollInput = roll?.join(' ') || '';

    if (rollInput === '' || rollInput == null || rollInput.length < 1) {
        return '[Error: No input]';
    }

    try {
        const roller = new DiceRoll(rollInput);

        return roller?.output;
    } catch {
        return '[Error: Unable to roll dice]';
    }
}
