export const config = {
  FC_URL: process.env.FC_URL || 'https://fcp.integ01.dev-franceconnect.fr',
  FD_URL: process.env.FD_URL || 'https://fournisseur-de-donnees.dev-franceconnect.fr',
  FS_URL: process.env.FS_URL || 'http://localhost:3000',
  DATA_CLIENT_ID: process.env.DATA_CLIENT_ID || '211286433e39cce01db448d80181bdfd005554b19cd51b3fe7943f6b3b86ab6e',
  DATA_CLIENT_SECRET: process.env.DATA_CLIENT_SECRET || '2791a731e6a59f56b6b4dd0d08c9b1f593b5f3658b9fd731cb24248e2669af4b',
  AUTHORIZATION_FC_PATH: process.env.AUTHORIZATION_FC_PATH || '/api/v1/authorize',
  TOKEN_FC_PATH: process.env.TOKEN_FC_PATH || '/api/v1/token',
  USERINFO_FC_PATH: process.env.USERINFO_FC_PATH || '/api/v1/userinfo',
  DATA_CALLBACK_FS_PATH: '/data-callback',
  FC_SCOPES: process.env.FC_SCOPES || [
    'openid',
    'given_name',
    'family_name',
    'preferred_username',
    'birthdate',
    'gender',
    'birthplace',
    'birth country'
  ].join(' '),
};