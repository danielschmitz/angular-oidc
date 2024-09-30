export const environment = {
  production: false,
  auth: {
    issuer: 'https://auth.test.ufjf.br',
    clientId: 'sigax',
    clientSecret: '466f446f1f7c',
    responseType: 'code',
    scope: 'openid profile',
    requireHttps: false,
    storage: localStorage  // pode-se usar sessionStorage
  },
};
