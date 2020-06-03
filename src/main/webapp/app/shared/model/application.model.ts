import { IAppStatus } from 'app/shared/model/app-status.model';
import { IBusinessCategory } from 'app/shared/model/business-category.model';

export interface IApplication {
  id?: number;
  name?: string;
  version?: string;
  status?: IAppStatus;
  businessCategory?: IBusinessCategory;
}

export class Application implements IApplication {
  constructor(
    public id?: number,
    public name?: string,
    public version?: string,
    public status?: IAppStatus,
    public businessCategory?: IBusinessCategory
  ) {}
}
