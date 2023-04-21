import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() currencySymbol: string = ' Lei';
  items: { product: Product, quantity: number, price: number }[] = [];
  totalPrice = null;

  constructor(private modalCtrl: ModalController, private cartService: CartService) {
    this.cartService.cartItems$.subscribe(config => {
      this.items = Object.values(config.items);
      this.totalPrice = config.totalPrice;
    })

  }

  ngOnInit() {
  }

  close() {
    return this.modalCtrl.dismiss({
      user: null,
    });
  }

  addItem(product: Product) {
    this.cartService.addOneItem(product);
  }

  removeItem(product: Product) {
    this.cartService.removeOneItem(product);
  }

  removeAll(product: Product) {
    this.cartService.removeAll(product);
  }

  placeOrder() {
    this.cartService.placeOrder().pipe(take(1)).subscribe(() => {
      this.close();
    })
  }
}
