import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpCMock: jasmine.SpyObj<any>;

  beforeEach(() => {
    httpCMock = {
      post: jasmine.createSpy(),
      get: jasmine.createSpy()
    }
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpCMock}
      ]
    });
    service = TestBed.inject(AuthService);
    service.url = 'url';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post on login', () => {
    service.login('email', 'pass');
    expect(httpCMock.get).toHaveBeenCalledWith('url/user/login/email/email/password/pass');
  });

  it('should call post on register', () => {
    const user = {
      id: 1,
      email: 'email',
      password: 'pass',
      name: 'name',
      farmer: false
    };
    service.register(user);
    expect(httpCMock.post).toHaveBeenCalledWith('url/user/register', user);
  });

  it('should set user', () => {
    const user = {
      id: 2,
      email: 'email',
      password: 'pass',
      name: 'name',
      farmer: false
    };
    service.setUser(user);
    expect(service.currentUser).toEqual(user);
  });

  it('should logout', () => {
    service.currentUser = {} as User;
    service.logout();
    expect(service.currentUser).toEqual(null as any);
  });

  it('should getUser', () => {
    service.currentUser = {} as User;
    expect(service.getUser()).toEqual({} as User);
  })

});
