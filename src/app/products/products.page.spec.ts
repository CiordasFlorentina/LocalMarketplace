import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule, ModalController } from '@ionic/angular';
import { BehaviorSubject, of } from 'rxjs';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { CartComponent } from './cart/cart.component';

import { ProductsPage } from './products.page';

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;
  let productsServiceMock: jasmine.SpyObj<any>;
  let cartServiceMock: jasmine.SpyObj<any>;
  let modalCtrlMock: jasmine.SpyObj<any>;

  beforeEach(waitForAsync(() => {
    productsServiceMock = {
      getProducts: jasmine.createSpy().and.returnValue(of([])),
      getCategories: jasmine.createSpy().and.returnValue(['vegetables']),
      getAvailabilityOpts: jasmine.createSpy().and.returnValue(['all']),
      getCurrencies: jasmine.createSpy().and.returnValue([]),
    };

    cartServiceMock = {
      cartItemsNr$: new BehaviorSubject(0),
      addOneItem: jasmine.createSpy(),
    };

    modalCtrlMock = {
      create: jasmine.createSpy().and.returnValue(Promise.resolve({
        present: jasmine.createSpy(),
        onDidDismiss: jasmine.createSpy()
      })),

    };

    TestBed.configureTestingModule({
      declarations: [ProductsPage],
      providers: [
        {provide: ProductsService, useValue: productsServiceMock},
        {provide: CartService, useValue: cartServiceMock},
        {provide: ModalController, useValue: modalCtrlMock}
      ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(waitForAsync(() => {
    component.ngOnDestroy();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('show list of products', () => {
    beforeEach(() => {
      component.products = [
        {name: 'Carrots', image: '', price: 25, category: 'vegetables', availability: 2},
        {name: 'Tomatoes', image: '', price: 15, category: 'vegetables', availability: 3},
      ];
      fixture.detectChanges();
    })

    it('should render 2 products', () => {
      const productElm = fixture.debugElement.queryAll(By.css('.product-card'));
      expect(productElm.length).toBe(2);
    });

    it('should display product name', () => {
      const productElm = fixture.debugElement.query(By.css('.product-card'));
      expect(productElm.query(By.css('.product-name')).nativeElement.innerText).toBe('Carrots');
    });

    it('should display product price', () => {
      const productElm = fixture.debugElement.query(By.css('.product-card'));
      expect(productElm.query(By.css('.product-price')).nativeElement.innerText).toBe('25');
    });

    it('should display product category', () => {
      const productElm = fixture.debugElement.query(By.css('.product-card'));
      expect(productElm.query(By.css('.product-category')).nativeElement.innerText).toBe('vegetables');
    });

    it('should display product available quantity', () => {
      const productElm = fixture.debugElement.query(By.css('.product-card'));
      expect(productElm.query(By.css('.product-availability')).nativeElement.innerText).toBe('2');
    });
  })

  describe('filter by category', () => {
    xit('should send chosen category as parameter in getProducts method', fakeAsync(() => {
      const categoryCheck = fixture.debugElement.query(By.css('.category-checkbox')).nativeElement;
      categoryCheck.click();
      tick(500);
      expect(productsServiceMock.getProducts).toHaveBeenCalledWith(
        jasmine.any(String),
        jasmine.any(String),
        [component.categoryOpts[0].value],
        [],
        'ron'
      );
    }));
  })

  describe('openCart', () => {
    it('should open cart modal', waitForAsync(() => {
      component.openCart().then(() => {
        expect(modalCtrlMock.create).toHaveBeenCalledWith({
          component: CartComponent,
          componentProps: {currencySymbol: ' Lei'}
        })
      });
    }));
  });

  it('should add item to cart', () => {
    component.addToCart({} as Product);
    expect(cartServiceMock.addOneItem).toHaveBeenCalledWith({});
  });

  it('should check category', () => {
    component.checkCategory(0);
    expect(component.categoryOpts[0].checked).toBe(true);
  });


  it('should check availability', () => {
    component.checkAvailability(0);
    expect(component.availabilityOpts[0].checked).toBe(true);
  });
});
