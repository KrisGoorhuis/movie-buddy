import React from 'react';
import './App.css';
import Main from './components/main.js'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

let initialState = { }

let reducer = (state = initialState, action) => {

}

const store = createStore(reducer);

function App() {
   return (
      <Provider store={store}>
         <Main />
      </Provider>
   );
}

export default App;
