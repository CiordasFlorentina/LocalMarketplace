import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceMock: jasmine.SpyObj<any>;

  beforeEach(async () => {
    authServiceMock = {
      currentUser: {farmer: false},
      logout: jasmine.createSpy()
    };
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {provide: AuthService, useValue: authServiceMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should logout user', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
  });
});
