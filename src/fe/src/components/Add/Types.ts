export enum Sex {
  Male = 1,
  Female = 2,
}

export enum Breed {
  Shepard = 1,
  Laika = 2,
}

export interface Dog {
  name: string | null;
  sex: Sex | null;
  birthDate: string | null;
  breed: Breed | null;
  hasObedience: boolean,
  hasManners: boolean,
  avatarUri: string | null,
}

export interface Result<T> {
  isSucceed: boolean;
  isFailed: boolean;
  message: responseMessages;
  data: T;
}

export interface AnyObject {
  [key: string]: string | undefined;
}

export enum responseMessages {
  Ok = 'Ok',
  GeneralError = 'GeneralError',
  NotFound= 'NotFound',
  NotAuthorized= 'NotAuthorized',
  Forbidden= 'Forbidden',
  Conflict= 'Conflict',
  AlreadyExists= 'AlreadyExists',
  EmptyRequiredParameter= 'EmptyRequiredParameter',
  BrokenLogic= 'BrokenLogic',
  ItemIsDisabled= 'ItemIsDisabled',
}

export interface DiskLinkResult {
  operation_id: string,
  href: string,
  method: string,
  template: boolean,
}

export interface DiskUploadResult {
  status: number,
  statusText: string,
}
