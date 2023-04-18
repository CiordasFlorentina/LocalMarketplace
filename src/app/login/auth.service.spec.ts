import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpCMock: jasmine.SpyObj<any>;

  beforeEach(() => {
    httpCMock = {
      post: jasmine.createSpy()
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
    expect(httpCMock.post).toHaveBeenCalledWith('url/login', {email: 'email', password: 'pass'});
  });

  it('should call post on register', () => {
    const user = {
      email: 'email',
      password: 'pass',
      name: 'name',
      farmer: false
    };
    service.register(user);
    expect(httpCMock.post).toHaveBeenCalledWith('url/register', user);
  });

  it('should set user', () => {
    const user = {
      email: 'email',
      password: 'pass',
      name: 'name',
      farmer: false
    };
    service.setUser(user);
    expect(service.currentUser).toEqual(user);
  });
});
