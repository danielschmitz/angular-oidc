export const environment = {
  production: true,
  auth: {
    issuer: '',
    clientId: '',
    clientSecret: '',
    responseType: 'code',
    scope: 'openid profile',
    requireHttps: true,
    storage: localStorage
  },
};
