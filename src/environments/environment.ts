export const environment = {
  production: true,
  auth: {
    issuer: 'http://auth.test.ufjf.br',
    clientId: 'sigax',
    clientSecret: 'secret',
    responseType: 'code',
    scope: 'openid profile',
    requireHttps: true,
  },
};
