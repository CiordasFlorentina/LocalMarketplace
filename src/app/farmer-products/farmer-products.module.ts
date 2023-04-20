import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { IonicModule } from '@ionic/angular';
import { AddProductComponent } from './add-product/add-product.component';

import { FarmerProductsPageRoutingModule } from './farmer-products-routing.module';

import { FarmerProductsPage } from './farmer-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FarmerProductsPageRoutingModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule
  ],
  declarations: [FarmerProductsPage, AddProductComponent]
})
export class FarmerProductsPageModule {
}
