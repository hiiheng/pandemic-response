import {API_ENV} from '../../env';

const postUserDeviceToken = (headers, body) =>
  fetch(`${API_ENV.hostServer}:8801/api/v2/tokens`, {
    method: 'POST',
    headers,
    body,
  });

export default {
  postUserDeviceToken,
};
