import { Parser } from './';

const instance = new Parser();

const message = {
    channel: {
        id: '123',
        name: 'test',
        coreId: '123',
        serviceId: '123',
    },
    provider: 'twitch',
    message: {
        args: ['d2', '3'],
        raw: 'test',
    },
    user: {
        id: '123',
        name: 'Nero',
        roles: ['test'],
    },
};

const setting = {
    timezone: 'America/New_York',
}

async function test() {
    // const INPUT = '{repeat {randomnum 1 10} 2} ; {repeat {randomnum 1 10} 2} ; {repeat {randomnum 1 10} 2}; {repeat {randomnum 1 10} 2}';
    // const INPUT = '{incr {repeat {randomnum 15 20} 5} {repeat {randomnum 15 20} 2}}';
    // const INPUT = '{repeat {repeat {randomnum 15 20} 5} 4}';
    const INPUT = '{lastfm spslive_}'

    console.log('Input:', INPUT);
    const res = await instance.parse(message, setting, INPUT);
    console.log('Output:', res);
}

test();