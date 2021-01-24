import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      html: {
        height: '100%',
      },
      body: {
        minHeight: '100vh',
      },
      '#root': {
        minHeight: 'inherit',
      },
    },
  },
});

export default theme;
