import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { flatMap, catchError, map } from 'rxjs/operators';

import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { CategoryService } from '../../categories/shared/category.service';
import { Product } from './product.model';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseResourceService<Product> {

  constructor(
    protected injector: Injector, private categoryService: CategoryService
  ) {
    super('http://localhost:8080/produtos', injector, Product.fromJson);
  }

  create(product: Product): Observable<Product> {
    return this.setCategoryAndSendToServer(product, super.create.bind(this));
  }

  update(product: Product): Observable<Product> {
    return this.setCategoryAndSendToServer(product, super.update.bind(this))
  }

  private setCategoryAndSendToServer(product: Product, sendFn: any): Observable<Product>{
    return this.categoryService.getById(product.categoriaId).pipe(
      flatMap(category => {
        product.categoria = category;
        return sendFn(product)
      }),
      catchError(this.handleError)
    );
  }
}
