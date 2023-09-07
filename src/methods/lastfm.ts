import * as config from 'config';
import { isString } from 'lodash';
import { stringify } from 'querystring';

import { ParserContext } from '../';
import { IMessage, ISetting } from '../interface';
import { httpRequest } from '../lib/helpers';

export interface IRecentTracks {
    error: number;
    recenttracks: {
        track: ITrack[];
        '@attr': {
            user: string;
            page: string;
            perPage: string;
            totalPages: string;
            total: string;
        };
    };
}

export interface ITrack {
    artist: {
        '#text': string;
        mbid: string;
    };
    name: string;
    mbid: string;
    streamable: string;
    album: {
        '#text': string;
        mbid: string;
    };
    url: string;
}

export type SongType = 'song' | 'artist' | 'link' | string;

/**
 * Check that the track requested is valid on the response then returns it.
 *
 * Also checks if the "when" param is valid.
 */
export function getTrack(tracks: ITrack[], when: string): ITrack {
    if (isNaN(Number(when)) || Number(when) < 0 || Number(when) > 10 || tracks[Number(when)] === undefined) {
        return tracks[0];
    }

    return tracks[when];
}

/**
 * Returns the LastFM data about a user based on the given type.
 *
 * Default: Returns the song name and artist.
 */
export async function lastfm(_message: IMessage, _settings: ISetting, { request }: ParserContext, user: string, type?: SongType, when: string = '0') {
    const reqOpts = {
        api_key: config.get<string>('api.lastfm.key'),
        format: 'json',
        limit: 10,
        method: 'user.getrecenttracks',
        user,
    };

    const req = await httpRequest<IRecentTracks>(request, `${config.get<string>('api.lastfm.base')}?${stringify(reqOpts)}`);
    if (req == null || isString(req) || req?.error != null) {
        return '[Error: Invalid User]';
    }

    const { name, artist, url } = getTrack(req.recenttracks.track, when);
    switch (type) {
        case 'song':
            return name;
        case 'artist':
            return artist['#text'];
        case 'link':
            return url;
        case 'all':
            return `${name} by ${artist['#text']} (${url})`;
        default:
            return `${name} by ${artist['#text']}`;
    }
}
