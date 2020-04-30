import env from '../../env';

const postUserDeviceToken = (headers, body) =>
  fetch(`${env.services.readAirNotifier.hostServer}:8801/api/v2/tokens`, {
    method: 'POST',
    headers,
    body,
  });

export default {
  postUserDeviceToken,
};
