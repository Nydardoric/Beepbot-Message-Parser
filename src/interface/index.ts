import { ParserContext } from '../';

export interface IMessage {
    channel: {
        id: string | number;
        name: string;
        /**
         * Core Id used as a unique name for backend processing.
         *
         * I.E. So we know what channel a var belongs too w/o having to convert the provider Id to the backend Id.
         */
        coreId?: string;
        /**
         * Service Id for the provider service.
         */
        serviceId?: string;
    };
    /**
     * The provider when the message came from. I.E. Twitch etc...
     */
    provider: string;
    message: {
        /**
         * The raw message but split on spaces.
         */
        args: string[];
        raw: string;
    };
    user: {
        id: string | number;
        name: string;
        roles?: string[];
    };
}

export interface ISetting {
    /**
     * The TimeZone to use as default when using the {time} parser.
     *
     * Valid: https://momentjs.com/timezone/
     */
    timezone: string;
}


export type ReturnValueType = string | number | boolean | undefined;

export interface ParserMethod {
    name: string;
    method: (message: IMessage, settings: ISetting, context: ParserContext, ...args: ReturnValueType[]) => ReturnValueType | Promise<ReturnValueType>
}
