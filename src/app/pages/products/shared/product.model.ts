import { BaseResourceModel } from '../../../shared/models/base-resource.model';
import { Category } from '../../categories/shared/category.model';

export class Product extends BaseResourceModel {
  constructor(
    public id?: number,
    public nome?: string,
    public precoCompra?: number,
    public precoVenda?: number,
    public quantidade?: number,
    public categoriaId?: number,
    public categoria?: Category
  ) {
    super();
  }

  static fromJson(jsonData: any): Product {
    return Object.assign(new Product(), jsonData);
  }
}
