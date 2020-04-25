export const ENV = process.env.NODE_ENV;

const HOST_ADDRESS =
  process.env.HOST_IP || process.env.HOST_NAME || 'localhost';

export const API_ENV = {
  development: {
    gqlApi: `http://${HOST_ADDRESS}:4466`,
  },
  production: {
    gqlApi: 'http://tech.hiiheng.com:4466',
  },
};

const getEnvVars = (env = ENV) => {
  if (env.indexOf('development') !== -1) {
    return API_ENV.development;
  }
  return API_ENV.production;
};

export default getEnvVars();
