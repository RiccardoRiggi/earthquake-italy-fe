import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';


const { store, persistor }: any = configureStore();


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
);

