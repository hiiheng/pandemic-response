export const ENV = process.env.NODE_ENV;

const DEV_HOST_ADDRESS =
  process.env.HOST_IP || process.env.HOST_NAME || 'localhost';

const PROD_HOST_ADDRESS = process.env.HOST_IP || process.env.HOST_NAME;

const readAirNotifier = {
  appName: 'hackathon',
  api: `http://${process.env.AIR_API}:${process.env.AIR_PORT || 4400}`,
  accessToken: process.env.AIR_TOKEN,
};

export const API_ENV = {
  hostServer: `http://${DEV_HOST_ADDRESS || PROD_HOST_ADDRESS}`,
  development: {
    gqlApi: `http://${DEV_HOST_ADDRESS}:4466`,
    services: {
      readAirNotifier,
    },
  },
  production: {
    gqlApi: `http://${PROD_HOST_ADDRESS}:4466`,
    services: {
      readAirNotifier,
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
