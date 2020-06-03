export interface IBusinessCategory {
  id?: number;
  name?: string;
  parentCategory?: IBusinessCategory;
}

export class BusinessCategory implements IBusinessCategory {
  constructor(public id?: number, public name?: string, public parentCategory?: IBusinessCategory) {}
}
