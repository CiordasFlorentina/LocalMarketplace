import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return categories', () => {
    expect(service.getCategories()).toEqual(['vegetables', 'fruits', 'greens', 'beans', 'nuts', 'seasonal']);
  });


  it('should return getAvailabilityOpts', () => {
    expect(service.getAvailabilityOpts()).toEqual([
      {label: 'all products', value: 'all'},
      {label: 'in stock', value: 'in stock'},
      {label: 'out of stock', value: 'out of stock'}
    ]);
  })

  it('should return currencies', () => {
    expect(service.getCurrencies()).toEqual([
      {label: 'RON', value: 'ron'},
      {label: 'EURO', value: 'eur'},
      {label: 'USD', value: 'usd'},
    ]);
  });

  it('should return currency symbol', () => {
    expect(service.getCurrencySymbol('eur')).toEqual('€');
  })

});
