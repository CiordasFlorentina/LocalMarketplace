import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { debounceTime, first, Subject, takeUntil } from 'rxjs';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {
  products: Product[] = [];
  sortByControl = new FormControl('name');
  searchControl = new FormControl('');
  currencyControl = new FormControl('ron');

  currencySymbol: string = ' Lei';

  cartItemsNr = this.cartService.cartItemsNr$;
  categoryOpts = this.productsService.getCategories().map(c => ({value: c, checked: false}));
  availabilityOpts = this.productsService.getAvailabilityOpts().map(o => ({...o, checked: false}));
  currencyOpts = this.productsService.getCurrencies();

  refreshProductsSubj = new Subject<void>();
  private onDestroy$ = new Subject();


  constructor(private productsService: ProductsService, private cartService: CartService, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.sortByControl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.refreshProductsSubj.next());

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => this.refreshProductsSubj.next());

    this.currencyControl.valueChanges
      .pipe(
        takeUntil(this.onDestroy$)
      ).subscribe((value) => {
      this.currencySymbol = this.productsService.getCurrencySymbol(value as string);
      this.refreshProductsSubj.next();
    })

    this.refreshProductsSubj.pipe(
      debounceTime(400),
      takeUntil(this.onDestroy$)
    ).subscribe(() => this.getProducts());

    this.refreshProductsSubj.next();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  checkCategory(index: number): void {
    this.categoryOpts[index].checked = !this.categoryOpts[index].checked;
    this.refreshProductsSubj.next();
  }

  checkAvailability(index: number): void {
    this.availabilityOpts[index].checked = !this.availabilityOpts[index].checked;
    this.refreshProductsSubj.next();
  }

  addToCart(product: Product): void {
    this.cartService.addOneItem(product);
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartComponent,
      componentProps: {currencySymbol: this.currencySymbol}
    });
    await modal.present();
  }

  private getProducts(): void {
    const sortBy = this.sortByControl.value as string;
    const categories = this.categoryOpts.filter(c => c.checked).map(c => c.value);
    const seasons = this.availabilityOpts.filter(s => s.checked).map(s => s.value);
    this.productsService.getProducts(this.searchControl.value, sortBy, categories, seasons, this.currencyControl.value as string)
      .pipe(first()).subscribe(res => this.products = res.items);
  }

}
