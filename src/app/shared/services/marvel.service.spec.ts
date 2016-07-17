import {
  it,
  describe,
  expect,
  inject,
  fakeAsync,
  beforeEach,
  addProviders,
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

  beforeEach(() => {
    addProviders([
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
  });

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

  describe('getCommonParams', () => {
    it('should return an empty array if there\s no commonsParameters in CONFIG',
    inject([MarvelService], (marvelService: MarvelService) => {
      let result;
      marvelService.config = {};
      result = marvelService.getCommonParams();
      expect(result.length).toBe(0);
    }));

    it('should return an array containing formated commonsParameters from CONFIG',
    inject([MarvelService], (marvelService: MarvelService) => {
      let result;
      marvelService.config = {
        commonsParameters: {
          test: 42
        }
      };
      result = marvelService.getCommonParams();
      expect(result[0]).toBe('test=42');
    }));
  });

  describe('getPagination', () => {
    it('should return an empty string if pageNumber is not > 1',
    inject([MarvelService], (marvelService: MarvelService) => {
      let result;
      marvelService.config = {};
      result = marvelService.getPagination(1);
      expect(result).toBe('');
    }));

    it('should return a string that contains offset= and (pageNumber - 1) * 20 if there\s no limit parameter in CONFIG',
    inject([MarvelService], (marvelService: MarvelService) => {
      let result;
      marvelService.config = {};
      result = marvelService.getPagination(2);
      expect(result).toBe('offset=20');
    }));

    it('should return a string that contains offset= and (pageNumber - 1) * CONFIG limit if specified',
    inject([MarvelService], (marvelService: MarvelService) => {
      let result;
      marvelService.config = {
        commonsParameters: {limit: 14}
      };
      result = marvelService.getPagination(4);
      expect(result).toBe('offset=42');
    }));
  });

  describe('getComicsFromType', () => {
    it('should call the comic endpoint for type parameter with id parameter',
    inject([MarvelService, MockBackend], fakeAsync((marvelService: MarvelService, MockBackend) => {
      let res;
      let type = 'test';
      let id = 123456;
      MockBackend.connections.subscribe(c => {
        expect(c.request.url).toContain(type + '/' + id + '/comics');
        let response = new ResponseOptions({
          status : 200,
          body: '{"comics": true}'
        });
        c.mockRespond(new Response(response));
      });
      marvelService.getComicsFromType(type, id).subscribe(response => {
        res = response;
      });
      tick();
      expect(res).toEqual({comics: true});
    })));

    it('should call getPagination if page exist and is not null',
    inject([MarvelService, MockBackend], fakeAsync((marvelService: MarvelService, MockBackend) => {
      let res;
      let type = 'test';
      let id = 123456;
      let page = 2;
      MockBackend.connections.subscribe(c => {
        let response = new ResponseOptions({
          status : 200,
          body: '{"comics": true}'
        });
        c.mockRespond(new Response(response));
      });
      spyOn(marvelService, 'getPagination');
      marvelService.getComicsFromType(type, id, page).subscribe(response => {
        res = response;
      });
      tick();
      expect(marvelService.getPagination).toHaveBeenCalled();
    })));
  });

  describe('getTypeList', () => {
    it('should call the type parameter endpoint',
    inject([MarvelService, MockBackend], fakeAsync((marvelService: MarvelService, MockBackend) => {
      let res;
      let type = 'test';
      MockBackend.connections.subscribe(c => {
        expect(c.request.url).toContain(type);
        let response = new ResponseOptions({
          status : 200,
          body: '{"comics": true}'
        });
        c.mockRespond(new Response(response));
      });
      marvelService.getTypeList(type).subscribe(response => {
        res = response;
      });
      tick();
      expect(res).toEqual({comics: true});
    })));

    it('should add titleStartsWith query parameter if startWithQuery exist and type is series',
    inject([MarvelService, MockBackend], fakeAsync((marvelService: MarvelService, MockBackend) => {
      let res;
      let type = 'series';
      let query = 'a';
      MockBackend.connections.subscribe(c => {
        expect(c.request.url).toContain('titleStartsWith=' + query);
        let response = new ResponseOptions({
          status : 200,
          body: '{"comics": true}'
        });
        c.mockRespond(new Response(response));
      });
      marvelService.getTypeList(type, query).subscribe(response => {
        res = response;
      });
      tick();
      expect(res).toEqual({comics: true});
    })));

    it('should add nameStartsWith query parameter if startWithQuery exist and type is series',
    inject([MarvelService, MockBackend], fakeAsync((marvelService: MarvelService, MockBackend) => {
      let res;
      let type = 'events';
      let query = 'a';
      MockBackend.connections.subscribe(c => {
        expect(c.request.url).toContain('nameStartsWith=' + query);
        let response = new ResponseOptions({
          status : 200,
          body: '{"comics": true}'
        });
        c.mockRespond(new Response(response));
      });
      marvelService.getTypeList(type, query).subscribe(response => {
        res = response;
      });
      tick();
      expect(res).toEqual({comics: true});
    })));

    it('should call getPagination if page exist and is not null',
    inject([MarvelService, MockBackend], fakeAsync((marvelService: MarvelService, MockBackend) => {
      let res;
      let type = 'tests';
      let page = 2;
      MockBackend.connections.subscribe(c => {
        let response = new ResponseOptions({
          status : 200,
          body: '{"comics": true}'
        });
        c.mockRespond(new Response(response));
      });
      spyOn(marvelService, 'getPagination');
      marvelService.getTypeList(type, null, page).subscribe(response => {
        res = response;
      });
      tick();
      expect(marvelService.getPagination).toHaveBeenCalled();
    })));
  });

});
