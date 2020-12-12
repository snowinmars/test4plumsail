import React from 'react';
import axios, {AxiosResponse} from 'axios';
import api from '../../config/api';
import {DiskLinkResult, DiskUploadResult, Dog, Result} from './Types';

export const save = (form: Dog): Promise<AxiosResponse<Result<Dog>>> => {
  const endpoint = `${api.uri}/api/dogs`;

  return axios.post<Result<Dog>>(endpoint, form);
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
    .then((x) => {
      return publish(path, api.yandexDiskOauthToken);
    });
};

export const onAvatarChange = (file: File, form: Dog, set: (form: Dog, value: string) => void) => {
  return uploadAvatar(file).then((x) => {
    const value = x.data;

    return set(form, value.href);
  });
};

export const onFormChange = (event: React.ChangeEvent<HTMLInputElement>, form: Dog, set: (form: Dog, value: string) => void): void => {
  const value = event.target.value;

  set(form, value);
};

export const onFormCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, form: Dog, set: (form: Dog, value: string) => void): void => {
  const value = event.target.name;

  set(form, value);
};

export const onFormEnumChange = <T>(event: React.ChangeEvent<HTMLInputElement>, form: Dog, set: (form: Dog, value: T) => void): void => {
  const value = event.target.value;
  const e = (value as unknown) as T;

  set(form, e);
};
