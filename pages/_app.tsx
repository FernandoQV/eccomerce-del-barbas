import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import {themeCurrent} from '../src/theme';
;

const MyApp:React.FC<AppProps>=({ Component, pageProps })=> {
  return (
    <ChakraProvider theme={themeCurrent}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
