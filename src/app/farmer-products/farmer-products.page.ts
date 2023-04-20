import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-farmer-products',
  templateUrl: './farmer-products.page.html',
  styleUrls: ['./farmer-products.page.scss'],
})
export class FarmerProductsPage implements OnInit {

  products: Product[] = [];

  constructor(private modalCtrl: ModalController, private productService: ProductsService) {
  }

  ngOnInit() {
    this.setProducts();
  }

  setProducts(): void {
    this.productService.getFarmersProducts('1').pipe(take(1)).subscribe(res => this.products = res);
  }

  async openModal(product: Product | null) {
    const modal = await this.modalCtrl.create({
      component: AddProductComponent,
      componentProps: {product}
    });
    await modal.present();

    modal.onDidDismiss().then((res) => {
      if (!res.data) {
        return;
      }
      let sub;

      if (res.data.mode === 'edit') {
        sub = this.productService.editProduct(res.data.product);
      } else {
        sub = this.productService.addProduct('1', res.data.product);
      }

      sub.pipe(take(1)).subscribe(() => this.setProducts());
    })
  }

}
