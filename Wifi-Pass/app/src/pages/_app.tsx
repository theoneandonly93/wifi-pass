import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';

import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification';
import SolanaWalletProvider from '../components/SolanaWalletProvider';
import FloatingLogos from '../components/FloatingLogos';
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
          <Head>
            <title>Dopelganga Lite</title>
          </Head>
          <SolanaWalletProvider>
            <ContextProvider>
              <div className="flex flex-col h-screen relative">
                <FloatingLogos />
                <Notifications />
                <AppBar/>
                <ContentContainer>
                  <Component {...pageProps} />
                  <Footer/>
                </ContentContainer>
              </div>
            </ContextProvider>
          </SolanaWalletProvider>
        </>
    );
}

export default App;
