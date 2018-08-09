import express from 'express';
import config from './config';
import serverRender from './serverRender';
import {data} from './testData.json';
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const serverData = await serverRender();
  res.render('index', { ...serverData });
});

app.get('/data', (req, res) => {
  res.send(data);
});

app.listen(config.port, () => console.info('listening on port', config.port));
