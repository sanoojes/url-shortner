import bodyParser from 'body-parser';
import express from 'express';

const app = express();

import { nanoid } from 'nanoid';
import { saveToDB, urlDB } from './utils/db.js';

app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const shortUrls = await urlDB.find({});
    res.render('index.ejs', { shortUrls: shortUrls });
  } catch (error) {
    console.error(error);
  }
});

app.post('/submit', (req, res) => {
  try {
    if (req.body.longUrl) {
      const id = nanoid(10);
      console.log(id);
      saveToDB(req.body.longUrl, id, Date.now(), 0);
    }
  } catch (error) {
    console.error(error);
  } finally {
    res.redirect('/');
  }
});

app.get('/:shortUrl', async (req, res) => {
  try {
    if (req.params.shortUrl) {
      console.log(req.params);
      const url = await urlDB.findOne({ shortendUrl: req.params.shortUrl });
      if (url) {
        await url.updateOne({ clicks: url.clicks + 1 });
        console.log(url.clicks);
        res.redirect(`${url.longUrl}`);
      } else {
        res.redirect('/');
        throw `Url Not Found`;
      }
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Url Shortner listening on port ${port}`);
});
