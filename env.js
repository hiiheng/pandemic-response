export const ENV = process.env.NODE_ENV;

const DEV_HOST_ADDRESS =
  process.env.HOST_IP || process.env.HOST_NAME || 'localhost';

const PROD_HOST_ADDRESS = process.env.HOST_IP || process.env.HOST_NAME;

const readAirNotifier = {
  accessToken: process.env.AIR_TOKEN,
  appName: 'INSERT_AIRNOTIFIER_APP_NAME',
  api: `http://${process.env.AIR_API}:${process.env.AIR_PORT || 8086}`,
};

export const API_ENV = {
  development: {
    gqlApi: `http://${DEV_HOST_ADDRESS}:4466`,
    services: {
      readAirNotifier: {
        ...readAirNotifier,
        hostServer: `http://${DEV_HOST_ADDRESS}`,
      },
    },
  },
  production: {
    gqlApi: `http://${PROD_HOST_ADDRESS}:4466`,
    services: {
      readAirNotifier: {
        ...readAirNotifier,
        hostServer: `http://${PROD_HOST_ADDRESS}`,
      },
    },
  },
};

const getEnvVars = (env = ENV) => {
  if (env.indexOf('development') !== -1) {
    return API_ENV.development;
  }
  return API_ENV.production;
};

export default getEnvVars();
