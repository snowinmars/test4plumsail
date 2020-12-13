import {AnyObject} from '../types/typescript';

interface EnvWindow {
  _env_: {
    REACT_APP_YANDEX_DISK_OAUTH_TOKEN: string,
    REACT_APP_HOST: string,
  }
}

const token = ((window as unknown) as EnvWindow)._env_.REACT_APP_YANDEX_DISK_OAUTH_TOKEN || '';
const uri = ((window as unknown) as EnvWindow)._env_.REACT_APP_HOST || '';

if (!token) throw new Error(`Yandex disk oauth token not found: ${token}`);
if (!uri) throw new Error(`Be uri not found: ${uri}`);

export default {
  paging: {
    perPage: 6,
  },
  uri: uri,
  defaultAvatar: 'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
  yandexDiskOauthToken: token,
  buildApiConfig: (): { headers: AnyObject } => {
    const defaultHeaders: AnyObject = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    return {
      headers: defaultHeaders,
    };
  },
  buildFileApiConfig: (): { headers: AnyObject } => {
    const defaultHeaders: AnyObject = {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    return {
      headers: defaultHeaders,
    };
  },
};
