import { OnInit, Injector } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export abstract class BaseResourceListComponent<T extends BaseResourceModel>
  implements OnInit {
  resources: T[] = [];
  searchForm: FormGroup;
  formBuilder: FormBuilder;

  constructor(protected injector: Injector, private resourceService: BaseResourceService<T>) {
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.buildSearchForm();
    this.refresh();
  }

  private buildSearchForm(){
    this.searchForm = this.formBuilder.group(
      {
        keyword: ['']
      }
    )
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.resourceService
        .delete(resource.id)
        .subscribe(
          () =>
            (this.resources = this.resources.filter(
              element => element != resource
            )),
          () => alert('Erro ao tentar excluir!')
        );
    }
  }

  abstract search()

  refresh(){
    this.resourceService
    .getAll()
    .subscribe(
      resources => (this.resources = resources.sort((a, b) => b.id - a.id)),
      error => alert('Erro ao carregar a lista')
    );
  }
}
