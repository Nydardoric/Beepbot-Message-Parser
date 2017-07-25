import * as config from 'config';
import { get } from 'lodash';

import { IMessage } from '../interface/message';
import { ISetting } from '../interface/settings';
import { getFromSimple, httpRequest, isValueValid } from '../lib/helpers';

export async function twitch(message: IMessage, settings: ISetting, request: typeof fetch, type: string, channel = message.channel.id) {
    const req = await httpRequest(request, `${config.get<string>('providers.twitch.api')}channels/${channel}`,
                                  {
                                    Accept: 'application/vnd.twitchtv.v5+json',
                                    'Client-ID': config.get<string>('providers.twitch.clientId'),
                                  },
                                 );
    if (req == null) {
        return '[API Error]';
    }
    const value = get(req, getFromSimple(message.provider.type, type), '[Type Not Found]');
    if (!isValueValid(value)) {
        return '[Return Value Invalid]';
    }
    return value;
}
