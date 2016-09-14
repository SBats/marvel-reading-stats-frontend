import {
  inject,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import { MockBackend } from '@angular/http/testing';

import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';

import { ApiService } from './api.service';

describe('API Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        ApiService,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  describe('checkStatus', () => {
    it('should return response if status is between 200 and 300',
    inject([ApiService], (ApiService: ApiService) => {
      let responseOptions = new ResponseOptions({
        status : 200,
        body: '{"comics": true}'
      });
      let reponse = new Response(responseOptions);
      let result = ApiService.checkStatus(reponse);
      expect(result instanceof Response).toBe(true);
      expect(result.json()).toEqual({comics: true});
    }));

    it('should throw an error if status is not between 200 and 300',
    inject([ApiService], (ApiService: ApiService) => {
      let errorThrown = false;
      let responseOptions = new ResponseOptions({
        status : 404
      });
      let reponse = new Response(responseOptions);
      try {
        ApiService.checkStatus(reponse);
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
    inject([ApiService], (ApiService: ApiService) => {
      let responseOptions = new ResponseOptions({
        status : 200,
        body: '{"comics": true}'
      });
      let reponse = new Response(responseOptions);
      let result = ApiService.parseJSON(reponse);
      expect(result).toEqual(reponse.json());
    }));
  });

  describe('getElementDetail', () => {
    it('should call the endpoint for type parameter and id parameter',
    inject([ApiService, MockBackend], fakeAsync((ApiService: ApiService, MockBackend) => {
      let res;
      let type = 'test';
      let id = 123456;
      MockBackend.connections.subscribe(c => {
        expect(c.request.url).toContain(type + '/' + id);
        let response = new ResponseOptions({
          status : 200,
          body: '{"comics": true}'
        });
        c.mockRespond(new Response(response));
      });
      ApiService.getElementDetail(type, id).subscribe(response => {
        res = response;
      });
      tick();
      expect(res).toEqual({comics: true});
    })));
  });

  describe('getTypeList', () => {
    it('should call the type parameter endpoint',
    inject([ApiService, MockBackend], fakeAsync((ApiService: ApiService, MockBackend) => {
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
      ApiService.getTypeList(type).subscribe(response => {
        res = response;
      });
      tick();
      expect(res).toEqual({comics: true});
    })));

    it('should add startWith query parameter if startWithQuery exist',
    inject([ApiService, MockBackend], fakeAsync((ApiService: ApiService, MockBackend) => {
      let res;
      let type = 'series';
      let query = 'a';
      MockBackend.connections.subscribe(c => {
        expect(c.request.url).toContain('startWith=' + query);
        let response = new ResponseOptions({
          status : 200,
          body: '{"comics": true}'
        });
        c.mockRespond(new Response(response));
      });
      ApiService.getTypeList(type, query).subscribe(response => {
        res = response;
      });
      tick();
      expect(res).toEqual({comics: true});
    })));
  });

});
