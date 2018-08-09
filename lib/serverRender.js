import React from 'react';
import { renderToString } from 'react-dom/server';
import axios from 'axios';
import App from './components/App';
import  config from './config';
import StateApi from './DataApi';

const serverRender = async () => {
  const resp = await axios.get(`http://${config.host}:${config.port}/data`);
  const store = new StateApi(resp.data);
  // const data = {
  //   articles: api.getArticles(),
  //   authors: api.getAuthors()
  // };
  return {
    initialMarkup: renderToString(<App store={store} />),
    initialData: resp.data
  };
};

export default serverRender;
