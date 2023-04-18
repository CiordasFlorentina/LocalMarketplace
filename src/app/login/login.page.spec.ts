import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let routerMock: jasmine.SpyObj<any>;
  let authServiceMock: jasmine.SpyObj<any>;

  beforeEach(waitForAsync(() => {
    authServiceMock = {
      login: jasmine.createSpy().and.returnValue(of(null)),
      register: jasmine.createSpy().and.returnValue(of(null)),
      setUser: jasmine.createSpy()
    }

    routerMock = {
      navigate: jasmine.createSpy()
    }
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        {provide: FormBuilder, useValue: new FormBuilder()},
        {provide: Router, useValue: routerMock},
        {provide: AuthService, useValue: authServiceMock},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change mode in switchMode', function () {
    component.switchMode('Register');
    expect(component.mode).toBe('Register');
  });

  it('should set  farmer control to false on check method', () => {
    component.check('customer');
    expect(component.registerForm.value.farmer).toBe(false);
  });

  it('should set login farmer control to true on check method', () => {
    component.farmerCheck.setValue(false);
    component.check('farmer');
    expect(component.registerForm.value.farmer).toBe(true);
  });

  it('should call authService.login on login method', () => {
    component.loginForm.setValue({
      email: 'email',
      password: 'pass'
    });
    component.login();
    expect(authServiceMock.login).toHaveBeenCalledWith('email', 'pass');
  });
});
