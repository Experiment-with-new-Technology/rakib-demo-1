export interface IAppStatus {
  id?: number;
  status?: string;
}

export class AppStatus implements IAppStatus {
  constructor(public id?: number, public status?: string) {}
}
