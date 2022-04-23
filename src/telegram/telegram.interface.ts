import { ModuleMetadata } from '@nestjs/common';

export interface ITelegramOptions {
    chatId: string;
    token: string;
}

export interface ITelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    // tslint:disable-next-line: no-any
    useFactory: (...args: any[]) => Promise<ITelegramOptions> | ITelegramOptions;
    // tslint:disable-next-line: no-any
    inject?: any[];
}