import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { Product } from '../models/product';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { AddProductComponent } from './add-product/add-product.component';

import { FarmerProductsPage } from './farmer-products.page';

describe('FarmerProductsPage', () => {
  let component: FarmerProductsPage;
  let fixture: ComponentFixture<FarmerProductsPage>;
  let modalControllerMock: jasmine.SpyObj<any>;
  let productsServiceMock: jasmine.SpyObj<any>;
  let authServiceMock: jasmine.SpyObj<any>;

  beforeEach(waitForAsync(() => {

    productsServiceMock = {
      getFarmersProducts: jasmine.createSpy().and.returnValue(of([])),
      editProduct: jasmine.createSpy().and.returnValue(of(true)),
      addProduct: jasmine.createSpy().and.returnValue(of(true)),
      getCategories: jasmine.createSpy().and.returnValue([])
    };

    modalControllerMock = {
      create: jasmine.createSpy().and.returnValue({
        present: jasmine.createSpy(),
        onDidDismiss: jasmine.createSpy().and.returnValue(Promise.resolve({data: {product: null, mode: 'edit'}})),
      })
    };

    authServiceMock = {
      getUser: jasmine.createSpy().and.returnValue({id: '1'})
    }

    TestBed.configureTestingModule({
      declarations: [FarmerProductsPage],
      providers: [
        {provide: ModalController, useValue: modalControllerMock},
        {provide: ProductsService, useValue: productsServiceMock},
        {provide: AuthService, useValue: authServiceMock},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal with product', waitForAsync(() => {
    component.openModal({} as Product).then(() => {
      expect(modalControllerMock.create).toHaveBeenCalledWith({
        component: AddProductComponent,
        componentProps: {product: {}}
      })
    })
  }));
});
