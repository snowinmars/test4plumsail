import {Breed, Sex} from './enums';

export interface DogCreateModel {
  name: string | null;
  sex: Sex | null;
  birthDay: string | null;
  breed: Breed | null;
  hasObedience: boolean,
  hasManners: boolean,
  avatar: string | null,
}

export interface DogReadModel extends DogCreateModel {
  id: string,
  createdDate: string,
  updatedDate: string,
}

export interface Result<T> {
  isSucceed: boolean;
  isFailed: boolean;
  data: T;
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
