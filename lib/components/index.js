import React from 'react';
import { hydrate } from 'react-dom';
import App from './App';
import StateApi from '../DataApi';

const store = new StateApi(window.initialData);

hydrate(<App store={store}/>, document.querySelector('#root'));
