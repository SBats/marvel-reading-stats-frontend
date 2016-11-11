import {
    Injectable,
    Optional
} from '@angular/core';

export class MarvelServiceConfig {
    checker: string
}

@Injectable()
export class MarvelService {
    checker: string = 'Marvel service loaded';

    constructor(@Optional() config: MarvelServiceConfig) {
        if (config) {
            this.checker = config.checker
        }
    }
}
