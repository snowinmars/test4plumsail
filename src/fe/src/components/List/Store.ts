import api from '../../config/api';
import axios, {AxiosResponse} from 'axios';
import {DogReadModel, Result} from '../../types/models';

export const list = (page = 0, perPage = 10, search = ''): Promise<AxiosResponse<Result<DogReadModel[]>>> => {
  const endpoint = `${api.uri}/api/dogs`;

  return axios.get<Result<DogReadModel[]>>(endpoint, {
    params: {
      page: page,
      perPage: perPage,
      search: search,
    },
  });
};
