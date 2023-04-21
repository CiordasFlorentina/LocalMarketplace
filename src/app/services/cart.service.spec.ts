import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let authServiceMock: jasmine.SpyObj<any>;

  beforeEach(() => {
    authServiceMock = {
      getUser: jasmine.createSpy().and.returnValue({id: '1'})
    }
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useValue: authServiceMock}
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item', () => {
    service.addOneItem(<any>{
      id: '1',
      price: 2
    } as Product);
    expect(service.cartItems.items).toEqual({
      1: {
        product: {id: '1', price: 2},
        price: 2,
        quantity: 1
      }
    })
  });

  it('should add a second item', () => {
    service.addOneItem(<any>{
      id: '1',
      price: 2
    } as Product);
    service.addOneItem(<any>{
      id: '1',
      price: 2
    } as Product);
    expect(service.cartItems.items).toEqual({
      1: {
        product: {id: '1', price: 2},
        price: 4,
        quantity: 2
      }
    })
  });

  it('should remove item', () => {
    service.addOneItem(<any>{
      id: '1',
      price: 2
    } as Product);

    service.removeOneItem(<any>{
      id: '1',
      price: 2
    } as Product);
    expect(service.cartItems.items).toEqual({
      1: {
        product: {id: '1', price: 2},
        price: 0,
        quantity: 0
      }
    })
  });

  it('should remove all', () => {
    service.addOneItem(<any>{
      id: '1',
      price: 2
    } as Product);

    service.removeAll(<any>{
      id: '1',
      price: 2
    } as Product);
    expect(service.cartItems.items).toEqual({})
  });
});
