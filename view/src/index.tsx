import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider, GlobalStyle } from '@chakra-ui/react';
import theme from './styles/theme';
import store from './store/store';

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
