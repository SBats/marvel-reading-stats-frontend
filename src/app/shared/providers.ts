import { StorageService } from './services/storage.service';
import { MRSService } from './services/mrs.service';
import { MarvelService } from './services/marvel.service';

export const MRS_APP_PROVIDER: any[] = [
  {provide: StorageService, useClass: StorageService},
  {provide: MRSService, useClass: MRSService},
  {provide: MarvelService, useClass: MarvelService}
];
