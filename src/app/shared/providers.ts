import { provide } from '@angular/core';

import { MRSService } from './mrs.service';
import { MarvelService } from './marvel.service';

export const MRS_APP_PROVIDER: any[] = [].concat(
  provide(MRSService, {useClass: MRSService}),
  provide(MarvelService, {useClass: MarvelService})
);
