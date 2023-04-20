import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { ProductsPage } from './products.page';
import { ProductsService } from '../services/products.service';

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;
  let productsServiceMock: jasmine.SpyObj<any>;

  beforeEach(waitForAsync(() => {
    productsServiceMock = {
      getProducts: jasmine.createSpy().and.returnValue(of([])),
      getCategories: jasmine.createSpy().and.returnValue(['vegetables'])
    };

    TestBed.configureTestingModule({
      declarations: [ProductsPage],
      providers: [
        {provide: ProductsService, useValue: productsServiceMock}
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    it('should send chosen category as parameter in getProducts method', fakeAsync(() => {
      const categoryCheck = fixture.debugElement.query(By.css('.category-checkbox')).nativeElement;
      categoryCheck.click();
      tick(400);
      expect(productsServiceMock.getProducts).toHaveBeenCalledWith(jasmine.any(String), [component.categoryOpts[0].value], []);
    }));
  })
});
