import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const createAppStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default createAppStore;