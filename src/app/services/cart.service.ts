import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemsNr$ = new BehaviorSubject(0);
  cartItems = <any>{
    items: {},
    totalPrice: 0
  };
  cartItems$ = new BehaviorSubject(this.cartItems);

  private cartItemsNr: number = 0;

  constructor(private authService: AuthService) {
  }

  addOneItem(item: Product) {
    if (item.id) {
      if (this.cartItems.items[item.id]) {
        this.cartItems.items[item.id].quantity++;
        this.cartItems.items[item.id].price += item.price;
        this.cartItems.totalPrice += item.price;
        this.increaseNr();
      } else {
        this.cartItems.items[item.id] = {
          product: item,
          quantity: 1,
          price: item.price
        }
        this.cartItems.totalPrice += item.price;
        this.increaseNr();
      }
      this.cartItems$.next(this.cartItems);
    }
  }

  removeOneItem(item: Product) {
    if (item.id) {
      if (this.cartItems.items[item.id]) {
        this.cartItems.items[item.id].quantity--;
        this.cartItems.items[item.id].price -= item.price;
        this.cartItems.totalPrice -= item.price;
        this.decrease();
        this.cartItems$.next(this.cartItems);
      }
    }
  }

  removeAll(item: Product) {
    if (item.id) {
      if (this.cartItems.items[item.id]) {
        const q = this.cartItems.items[item.id].quantity;
        const price = this.cartItems.items[item.id].price;
        delete this.cartItems.items[item.id];
        this.cartItems.totalPrice -= price;
        this.cartItemsNr -= q;
        this.cartItemsNr$.next(this.cartItemsNr);
        this.cartItems$.next(this.cartItems);
      }
    }
  }

  placeOrder(): Observable<any> {
    const payload = {
      'consumer_id': this.authService.getUser().id,
      'product_ids': <any>[],
      'product_qty': <any>[]
    }

    Object.values(this.cartItems.items).forEach((item: any) => {
      payload['product_ids'].push(item.product.id);
      payload['product_qty'].push(item.quantity);
    });

    return of(true);
  }


  private increaseNr(): void {
    this.cartItemsNr++;
    this.cartItemsNr$.next(this.cartItemsNr);
  }

  private decrease(): void {
    this.cartItemsNr--;
    this.cartItemsNr$.next(this.cartItemsNr);
  }
}
