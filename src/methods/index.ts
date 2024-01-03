import * as channel from './channel';
import { charity } from './charity';
import { costream } from './costream';
import { diceroll } from './diceroll';
import { extralife } from './extralife';
import { followage } from './followage';
import { glimesh } from './glimesh';
import { lastfm } from './lastfm';
import { mastodon } from './mastodon';
import { picarto } from './picarto';
import { pretzel } from './pretzel';
import { randomuser } from './randomuser';
import * as str from './string';
import { time } from './time';
import { trovo } from './trovo';
import { tweet } from './tweet';
import { twitch } from './twitch';
import { uptime } from './uptime';
import { urlfetch } from './urlfetch';
import * as users from './users';
import { variable } from './variable';
import { weather } from './weather';

export const methods = {
    ...channel,
    charity,
    costream,
    diceroll,
    extralife,
    followage,
    glimesh,
    lastfm,
    mastodon,
    picarto,
    pretzel,
    randomuser,
    ...str,
    time,
    trovo,
    twitch,
    tweet,
    uptime,
    urlfetch,
    ...users,
    variable,
    weather,
};
