import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, first, Subject, takeUntil } from 'rxjs';
import { Product } from '../models/product';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {
  products: Product[] = [];
  sortByControl = new FormControl('name');
  searchControl = new FormControl('');

  categoryOpts = [
    {value: 'vegetables', checked: false},
    {value: 'fruits', checked: false},
  ];

  availabilityOpts = [
    {label:'all products', value: 'all', checked: false},
    {label: 'in stock', value: 'in stock', checked: false},
    {label: 'out of stock', value: 'out of stock', checked: false},
  ];

  refreshProductsSubj = new Subject<void>();

  private onDestroy$ = new Subject();

  constructor(private productsService: ProductsService) {
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

    this.refreshProductsSubj.pipe(
      debounceTime(300),
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

  checkSeason(index: number): void {
    this.availabilityOpts[index].checked = !this.availabilityOpts[index].checked;
    this.refreshProductsSubj.next();
  }

  private getProducts(): void {
    const sortBy = this.sortByControl.value as string;
    const categories = this.categoryOpts.filter(c => c.checked).map(c => c.value);
    const seasons = this.availabilityOpts.filter(s => s.checked).map(s => s.value);
    this.productsService.getProducts(sortBy, categories, seasons).pipe(first()).subscribe(res => this.products = res.items);
  }
}
