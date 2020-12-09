import {AnyObject} from '../components/Add/Types';

const token = process.env.REACT_APP_YANDEX_DISK_OAUTH_TOKEN || '';

if (!token) throw new Error(`Yandex disk oauth token not found: ${token}`);

export default {
  uri: 'ya.ru',
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
