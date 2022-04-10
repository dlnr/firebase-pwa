import express from 'express';
import functions from 'firebase-functions';
import https from 'https';
// import LRU from 'lru-cache';

import routes from './lib/routes.mjs';

import footerPartial from '../build/partials/footer.html';
import headerPartial from '../build/partials/header.html';
import startPartial from '../build/partials/start.html';

const httpsAgent = new https.Agent({
    keepAlive: true,
});

const app = express();

app.get(routes.get('index'), async (req, res) => {
    res.write(headerPartial);
    res.write(startPartial);
    res.write(footerPartial);
    res.end();
  });

  export const handleRequest = functions.https.onRequest(app);