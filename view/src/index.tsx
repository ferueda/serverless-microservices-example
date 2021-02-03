import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider, GlobalStyle } from '@chakra-ui/react';

import theme from './styles/theme';
import store from './store/store';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
