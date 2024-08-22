export const environment = {
  production: false,
  auth: {
    issuer: 'http://localhost:9000',
    clientId: 'polare',
    clientSecret: 'secret',
    responseType: 'code',
    scope: 'openid profile',
    requireHttps: false,
  },
};
