import { createStore } from 'redux';
import reducers from './reducers/contacts.js';

const store = createStore(reducers);

export default store;