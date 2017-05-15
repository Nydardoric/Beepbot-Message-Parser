import * as config from 'config';
import { get } from 'lodash';

import { IMessage } from '../interface/message';
import { ISetting } from '../interface/settings';
import { getFromSimple, request } from '../lib/helpers';

export async function beam(message: IMessage, settings: ISetting, type: string, channel: string | number = message.channel.id) {
    const req = await request(`${config.get<string>('providers.beam.api')}channels/${channel}`);
    if (req == null) {
        return '[API Error]';
    }
    return get(req, getFromSimple(message.provider.type, type), '[Invalid Type]');
}
