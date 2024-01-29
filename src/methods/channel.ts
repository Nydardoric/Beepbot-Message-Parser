import * as config from 'config';

import { Parser, ParserContext } from '../';
import { IMessage, ISetting } from '../interface';
import { removeTag } from '../lib/helpers';
import { kick } from './kick';
import { picarto } from './picarto';
import { trovo } from './trovo';
import { twitch } from './twitch';

const providers: { [provider: string]: (...args: any[]) => Promise<string> } = {
    kick,
    trovo,
    twitch,
    picarto,
};

export function streamer(message: IMessage) {
    return message.channel.name;
}

export function stream(message: IMessage, _settings: ISetting, _context: ParserContext, channel: string = message.channel.name) {
    if (config.has(`providers.${message.provider.toLowerCase()}.urls.base`) === false) {
        return '[Error: Invalid Provider]';
    }

    return `${config.get<string>(`providers.${message.provider.toLowerCase()}.urls.base`)}/${removeTag(channel)}`;
}

export function link(message: IMessage, _settings: ISetting, _context: ParserContext, channel: string = message.channel.name) {
    return stream(message, _settings, _context, channel);
}

/**
 * Get the current title of the stream.
 */
export async function title(this: Parser, message: IMessage, settings: ISetting, context: ParserContext, channel = message.channel.id) {
    if (providers[message.provider.toLowerCase()] === undefined) {
        return '[Error: Invalid Provider]';
    }

    return providers[message.provider.toLowerCase()].call(this, message, settings, context, 'title', channel);
}

/**
 * Get the current game/category being streamed.
 */
export async function game(this: Parser, message: IMessage, settings: ISetting, context: ParserContext, channel = message.channel.id) {
    if (providers[message.provider.toLowerCase()] === undefined) {
        return '[Error: Invalid Provider]';
    }

    return providers[message.provider.toLowerCase()].call(this, message, settings, context, 'game', channel);
}

/**
 * Get the provider which the message was sent from.
 */
export function provider(message: IMessage) {
    return message.provider;
}

/**
 * Get the previous status for the channel if we have it cached.
 */
export async function previousstatus(this: Parser, message: IMessage, _settings: ISetting, _context: ParserContext, type: string = 'title') {
    const previous = await this.middleware.onHandleMethod('previousStatus', message);
    if (previous == null) {
        return '[Error: Unable to get previous status]';
    }

    return previous[type] || `[Error: Failed to find value for type "${type}"]`;
}
