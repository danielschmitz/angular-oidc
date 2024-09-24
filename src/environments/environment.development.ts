export const environment = {
  production: false,
  auth: {
    issuer: 'http://localhost:9000',
    clientId: 'clientId',
    clientSecret: 'secret',
    responseType: 'code',
    scope: 'openid profile',
    requireHttps: false,
    storage: localStorage  // pode-se usar sessionStorage
  },
};
