import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent extends BaseResourceFormComponent<Product>
  implements OnInit {

  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    protected productService: ProductService,
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, new Product(), productService, Product.fromJson);
  }

  ngOnInit() {
    this.loadCategories();
    super.ngOnInit();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [0],
      nome: ['', [Validators.required, Validators.minLength(2)]],
      precoCompra: [0.00, [Validators.required]],
      precoVenda: [0.00, [Validators.required]],
      quantidade: [0.00, [Validators.required]],
      categoriaId: [0, [Validators.required]]
    });
  }

  private loadCategories() {
    this.categoryService
      .getAll()
      .subscribe(categories => (this.categories = categories));
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Novo Produto';
  }

  protected editionPageTitle(): string {
    const resourceName = this.resource.nome || '';
    return 'Editando Produto: ' + resourceName;
  }

  protected loadResource() {
    if (this.currentAction == 'edit') {

      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get('id')))
      )
      .subscribe(
        (resource) => {
          this.resource = resource;
          this.resource.categoriaId = this.resource.categoria.id;
          this.resourceForm.patchValue(resource) // binds loaded resource data to resourceForm
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }
}
