import {Breed, Sex} from './enums';

export interface DogCreateModel {
  sex: Sex | null;
  name: string | null;
  breed: Breed | null;
  avatar: string | null,
  birthDay: string | null;
  hasManners: boolean,
  hasObedience: boolean,
}

export interface DogReadModel extends DogCreateModel {
  id: string,
  createdDate: string,
  updatedDate: string,
}

export interface Result<T> {
  data: T;
  isSucceed: boolean;
  isFailed: boolean;
}

export interface ResultList<T> extends Result<T>{
  count: number,
}

export interface DiskLinkResult {
  href: string,
  method: string,
  template: boolean,
  operation_id: string,
}

export interface DiskUploadResult {
  status: number,
  statusText: string,
}
