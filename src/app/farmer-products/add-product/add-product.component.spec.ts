import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let modalControllerMock: jasmine.SpyObj<any>;
  let productsServiceMock: jasmine.SpyObj<any>;

  beforeEach(waitForAsync(() => {
    productsServiceMock = {
      getCategories: jasmine.createSpy().and.returnValue([])
    };

    modalControllerMock = {
      dismiss: jasmine.createSpy()
    };

    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      providers: [
        {provide: ModalController, useValue: modalControllerMock},
        {provide: ProductsService, useValue: productsServiceMock},
        {provide: FormBuilder, useValue: new FormBuilder()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    component.close();
    expect(modalControllerMock.dismiss).toHaveBeenCalled();
  });

  it('should save product', () => {
    component.form?.patchValue({
      name: 'name',
      price: 2,
      availability: 3,
      category: 'vegetables'
    })
    component.save();
    expect(modalControllerMock.dismiss).toHaveBeenCalledWith({
      product: {
        name: 'name',
        price: 2,
        availability: 3,
        category: 'vegetables',
        image: null
      },
      mode: 'add'
    });
  });

  it('should edit product', () => {
    component.product = {
      id: '11',
      name: 'name',
      price: 2,
      availability: 3,
      category: 'vegetables',
      image: ''
    } as Product;
    fixture.detectChanges();
    component.ngOnInit();
    component.save();
    expect(modalControllerMock.dismiss).toHaveBeenCalledWith({
      product: {
        id: '11',
        name: 'name',
        price: 2,
        availability: 3,
        category: 'vegetables',
        image: ''
      },
      mode: 'edit'
    });
  });

  it('should clear image', () => {
    component.clearImage();
    expect(component.form.value.image).toBe(null);
  });
  it('should not clear image if form is not set correctly', () => {
    component.form.removeControl('image');
    component.clearImage();
    expect(component.form.value.image).toBe(undefined);
  });

  it('should not try to convert image if none was selected', () => {
    component.selectFile({target: {files: []}});
    expect(component.form.value.image).toBe(null);
  });

  it('should not try to convert image if event target is null', () => {
    component.selectFile({});
    expect(component.form.value.image).toBe(null);
  });

  it('should not try to convert image if event is null', () => {
    component.selectFile(null);
    expect(component.form.value.image).toBe(null);
  });
});
