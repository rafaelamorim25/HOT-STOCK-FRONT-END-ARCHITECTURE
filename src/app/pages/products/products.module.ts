import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { IMaskModule } from 'angular-imask';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ProductsRoutingModule,
    IMaskModule
  ],
  declarations: [ProductListComponent, ProductFormComponent]
})
export class ProductsModule { }
