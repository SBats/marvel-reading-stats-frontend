import {
  it,
  describe,
  expect,
  inject,
  fakeAsync,
  beforeEachProviders,
  tick
} from '@angular/core/testing';

import { MockBackend } from '@angular/http/testing';
import { provide } from '@angular/core';

import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';

import { MarvelService } from './marvel.service';

describe('Marvel Service', () => {

  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    MarvelService,
    provide(
      Http,
      {
        useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }
    ),
  ]);

  describe('checkStatus', () => {
    it('should return response if status is between 200 and 300',
    inject([MarvelService], (marvelService: MarvelService) => {
      let responseOptions = new ResponseOptions({
        status : 200,
        body: '{"comics": true}'
      });
      let reponse = new Response(responseOptions);
      let result = marvelService.checkStatus(reponse);
      expect(result instanceof Response).toBe(true);
      expect(result.json()).toEqual({comics: true});
    }));

    it('should throw an error if status is not between 200 and 300',
    inject([MarvelService], (marvelService: MarvelService) => {
      let errorThrown = false;
      let responseOptions = new ResponseOptions({
        status : 404
      });
      let reponse = new Response(responseOptions);
      try {
        marvelService.checkStatus(reponse);
      } catch (err) {
        errorThrown = true;
        expect(err instanceof Error).toBe(true);
      }
      if (!errorThrown) {
        // Reject if no error was trhown
        expect(false).toBe(true);
      }
    }));
  });

  describe('parseJSON', () => {
    it('should return response.json()',
    inject([MarvelService], (marvelService: MarvelService) => {
      let responseOptions = new ResponseOptions({
        status : 200,
        body: '{"comics": true}'
      });
      let reponse = new Response(responseOptions);
      let result = marvelService.parseJSON(reponse);
      expect(result).toEqual(reponse.json());
    }));
  });

  describe('getComics', () => {
    it('should call the mocked data',
    inject([MarvelService, MockBackend], fakeAsync((MarvelService, MockBackend) => {
      let res;
      MockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('/data/comics.mock.json');
        let response = new ResponseOptions({
          status : 200,
          body: '{"comics": true}'
        });
        c.mockRespond(new Response(response));
      });
      MarvelService.getComics().subscribe(_res => {
        res = _res;
      });
      tick();
      expect(res).toEqual({comics: true});
    })));
  });

  describe('getSeries', () => {
    it('should call the mocked data',
    inject([MarvelService, MockBackend], fakeAsync((MarvelService, MockBackend) => {
      let res;
      MockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('/data/series.mock.json');
        let response = new ResponseOptions({
          status : 200,
          body: '{"comics": true}'
        });
        c.mockRespond(new Response(response));
      });
      MarvelService.getSeries().subscribe(_res => {
        res = _res;
      });
      tick();
      expect(res).toEqual({comics: true});
    })));
  });

});
