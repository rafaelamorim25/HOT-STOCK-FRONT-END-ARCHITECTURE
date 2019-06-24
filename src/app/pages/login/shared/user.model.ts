import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class User extends BaseResourceModel {
  constructor(
    public email?: string,
    public senha?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): User {
    return Object.assign(new User(), jsonData);
  }
}
