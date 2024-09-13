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
        args: ['d2', 'SPS'],
        raw: 'test',
    },
    user: {
        id: '36297622',
        name: 'artdude543',
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
    // const INPUT = '{weather York,UK}'
    // const INPUT = 'Beep can MATH?! {math 10 degC to degF}';
    // const INPUT = `{tweet SPSinBOS}`
    // const INPUT = `/me [MH] Hunt chosen: {urlfetch https://mesozoichaven.com/bot-txt/mhrise_monsters.txt rand} With Mode: {urlfetch https://mesozoichaven.com/bot-txt/mh-hunt-mode.txt rand}`;
    // const INPUT = `{randlist "Cheese Cakes; Melons"}`;
    // const INPUT = `{urlfetchctx {compile "https://api.synerate.com/beepbot/v2/channels/{user}"}} {ctx 0 name} {ctx 0 user.id} {ctx 0 user.grants[0].provider}`;
    // const INPUT = `{currencyadjust {randomnum 15 20}} {user}'s fireteam took down Nezarec! After not getting the Exotic for the {randomnum 5 100}th time now, you gain {ctx 0} {currencyname {ctx 0}}`;
    // const INPUT = `{urldecode cheese%20takes%20like%20cake}`;
    const INPUT = `{rainwave game}`;

    console.log('Input:', INPUT);
    const res = await instance.parse(message, setting, INPUT);
    console.log('Output:', res);
}

async function testWithOutContext() {
    // const INPUT = '{repeat {randomnum 1 10} 2} ; {repeat {randomnum 1 10} 2} ; {repeat {randomnum 1 10} 2}; {repeat {randomnum 1 10} 2}';
    // const INPUT = '{incr {repeat {randomnum 15 20} 5} {repeat {randomnum 15 20} 2}}';
    // const INPUT = '{repeat {repeat {randomnum 15 20} 5} 4}';
    // const INPUT = '{weather York,UK}'
    const INPUT = 'Beep can MATH?! {math 10 degC to degF} {user}';
    console.log('Input:', INPUT);
    const res = await instance.parseWithOutContext(INPUT);
    console.log('Output:', res);
}

async function testWithAddingMethods() {
    const INPUT = '{test}';
    console.log('Input:', INPUT);

    instance.addMethods({
        name: 'test',
        method: async (message, settings, context) => {
            return 'Hello World!';
        }
    });
    instance.addMethods([
        {
            name: 'test2',
            method: async (message, settings, context) => {
                return 'Hello World 2!';
            }
        },
        {
            name: 'test3',
            method: async (message, settings, context) => {
                return 'Hello World 3!';
            }
        }
    ]);

    const res = await instance.parse(message, setting, INPUT);
    console.log('Output:', res);

    const res2 = await instance.parse(message, setting, '{test2}');
    console.log('Output:', res2);

    const res3 = await instance.parse(message, setting, '{test3}');
    console.log('Output:', res3);
}

async function testWithAddingMethodAlreadyExist() {
    const INPUT = '{test}';
    console.log('Input:', INPUT);

    instance.addMethods({
        name: 'test',
        method: async (message, settings, context) => {
            return 'Hello World!';
        }
    });
    // try to add it again.
    instance.addMethods({
        name: 'test',
        method: async (message, settings, context) => {
            return 'Hello World!';
        }
    });

    const res = await instance.parse(message, setting, INPUT);
    console.log('Output:', res);
}

// test();
// testWithOutContext();
testWithAddingMethods();
// testWithAddingMethodAlreadyExist();
