import { provide } from '@angular/core';

import { StorageService } from './storage.service';
import { MRSService } from './mrs.service';
import { MarvelService } from './marvel.service';

export const MRS_APP_PROVIDER: any[] = [].concat(
  provide(StorageService, {useClass: StorageService}),
  provide(MRSService, {useClass: MRSService}),
  provide(MarvelService, {useClass: MarvelService})
);
