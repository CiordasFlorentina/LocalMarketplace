import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, of } from 'rxjs';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceMock: jasmine.SpyObj<any>;
  let modalCtrlMock: jasmine.SpyObj<any>;

  beforeEach(waitForAsync(() => {

    cartServiceMock = {
      cartItems$: new BehaviorSubject({
        items: {},
        totalPrice: 0
      }),
      addOneItem: jasmine.createSpy(),
      removeOneItem: jasmine.createSpy(),
      removeAll: jasmine.createSpy(),
      placeOrder: jasmine.createSpy().and.returnValue(of(true)),
    };

    modalCtrlMock = {
      dismiss: jasmine.createSpy()
    }

    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        {provide: CartService, useValue: cartServiceMock},
        {provide: ModalController, useValue: modalCtrlMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    component.close()
    expect(modalCtrlMock.dismiss).toHaveBeenCalled();
  });

  it('should add item', () => {
    component.addItem({} as Product)
    expect(cartServiceMock.addOneItem).toHaveBeenCalledWith({});
  });

  it('should remove item', () => {
    component.removeItem({} as Product)
    expect(cartServiceMock.removeOneItem).toHaveBeenCalledWith({});
  });

  it('should remove all', () => {
    component.removeAll({} as Product)
    expect(cartServiceMock.removeAll).toHaveBeenCalledWith({});
  });
});
