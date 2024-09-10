import express from 'express';
import crypto from 'crypto';
import { URLSearchParams } from 'url';
import { config } from './config.js';

const app = express();


// Initial entry point to guide the user to authorize access to their data
app.get('/', (req, res) => {
  const query = {
    scope: `${config.FC_SCOPES}`,
    redirect_uri: `${config.FS_URL}${config.DATA_CALLBACK_FS_PATH}`,
    response_type: 'code',
    client_id: config.DATA_CLIENT_ID,
    state: `state${crypto.randomBytes(16).toString('hex')}`,
    nonce: `nonce${crypto.randomBytes(16).toString('hex')}`,
    acr_values: 'eidas1',
  };

  const url = `${config.FC_URL}${config.AUTHORIZATION_FC_PATH}`;
  const params = new URLSearchParams(query).toString();

  res.redirect(`${url}?${params}`);
});

// Callback to receive the authorization code and exchange it for an access token
app.get(`${config.DATA_CALLBACK_FS_PATH}`, async (req, res) => {

  // Get the access token using the authorization code
  const tokenResponse = await fetch(
    `${config.FC_URL}${config.TOKEN_FC_PATH}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        redirect_uri: `${config.FS_URL}${config.DATA_CALLBACK_FS_PATH}`,
        client_id: config.DATA_CLIENT_ID,
        client_secret: config.DATA_CLIENT_SECRET,
        code: req.query.code,  // auth code received from FranceConnect
      }).toString(),
    }
  );

  const { access_token: accessToken } = await tokenResponse.json();

  // Fetch the user's data using the access token
  const userInfoResponse = await fetch(
    `${config.FC_URL}${config.USERINFO_FC_PATH}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const userInfo = await userInfoResponse.json();

  console.log('User Info:', userInfo);
  res.json(userInfo);
});

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
