import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerProductsPage } from './farmer-products.page';

const routes: Routes = [
  {
    path: '',
    component: FarmerProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerProductsPageRoutingModule {}
