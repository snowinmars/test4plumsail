import React from 'react';
import axios, {AxiosResponse} from 'axios';
import api from '../../config/api';
import {DiskLinkResult, DiskUploadResult, DogCreateModel, Result} from '../../types/models';

export const save = (form: DogCreateModel): Promise<boolean> => {
  const endpoint = `${api.uri}/api/dogs`;

  return axios.post<Result<DogCreateModel>>(endpoint, form)
    .then((x) => x.status >= 200 && x.status < 300);
};

const getUploadLink = (path: string, token: string): Promise<AxiosResponse<DiskLinkResult>> => {
  const uri = 'https://cloud-api.yandex.net/v1/disk/resources/upload';

  return axios.get<DiskLinkResult>(uri, {
    params: {
      path: path,
    },
    headers: {
      Authorization: `OAuth ${token}`,
    },
  });
};

const getRandomString = () => (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);

const publish = (path: string, token: string): Promise<AxiosResponse<DiskLinkResult>> => {
  const uri = 'https://cloud-api.yandex.net/v1/disk/resources/download';

  return axios.get(uri, {
    params: {
      path: path,
    },
    headers: {
      Authorization: `OAuth ${token}`,
    },
  });
};

const uploadAvatar = (file: File): Promise<AxiosResponse<DiskLinkResult>> => {
  const path = getRandomString();

  return getUploadLink(path, api.yandexDiskOauthToken)
    .then((x) => {
      const formData = new FormData();
      formData.append('file', file, file.name);
      return axios.post<DiskUploadResult>(x.data.href, formData, api.buildFileApiConfig());
    })
    .then(() => {
      return publish(path, api.yandexDiskOauthToken);
    });
};

export const onAvatarChange = (file: File, form: DogCreateModel, set: (form: DogCreateModel, value: string) => void): Promise<AxiosResponse<DiskLinkResult>> => {
  return uploadAvatar(file).then((x) => {
    const value = x.data;

    set(form, value.href);

    return x;
  });
};

export const onFormChange = (event: React.ChangeEvent<HTMLInputElement>, form: DogCreateModel, set: (form: DogCreateModel, value: string) => void): void => {
  const value = event.target.value;

  set(form, value);
};

export const onFormCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, form: DogCreateModel, set: (form: DogCreateModel, value: string) => void): void => {
  const value = event.target.name;

  set(form, value);
};

export const onFormEnumChange = <T>(event: React.ChangeEvent<HTMLInputElement>, form: DogCreateModel, set: (form: DogCreateModel, value: T) => void): void => {
  const value = event.target.value;
  const e = (value as unknown) as T;

  set(form, e);
};
