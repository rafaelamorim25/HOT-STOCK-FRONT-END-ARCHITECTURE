import { Component, OnInit, Injector } from '@angular/core';

import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';

import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseResourceListComponent<Product> {

  constructor(private entryService: ProductService,
    protected injector: Injector) {
    super(injector, entryService);
  }

  search() {
    const key: string = this.searchForm.get('keyword').value;

    if (key === '') {
      this.refresh();
    } else {
      this.resources = this.resources.filter(element =>
        element.nome.includes(key) || element.categoria.nome.includes(key)
      );
    }
  }
}
