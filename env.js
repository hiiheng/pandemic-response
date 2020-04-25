export const ENV = process.env.NODE_ENV;

const DEV_HOST_ADDRESS =
  process.env.HOST_IP || process.env.HOST_NAME || 'localhost';

const PROD_HOST_ADDRESS = process.env.HOST_IP || process.env.HOST_NAME;

export const API_ENV = {
  development: {
    gqlApi: `http://${DEV_HOST_ADDRESS}:4466`,
  },
  production: {
    gqlApi: `http://${PROD_HOST_ADDRESS || '167.71.82.22'}:4466`,
  },
};

const getEnvVars = (env = ENV) => {
  if (env.indexOf('development') !== -1) {
    return API_ENV.development;
  }
  return API_ENV.production;
};

export default getEnvVars();
