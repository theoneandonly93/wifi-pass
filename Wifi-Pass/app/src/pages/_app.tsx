
import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';

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
          {/* Keep Next.js dev overlay working: only catch render errors inside content */}
          <SolanaWalletProvider>
            <ContextProvider>
              <div className="flex flex-col min-h-screen relative">
                <FloatingLogos />
                <Notifications />
                <AppBar/>
                <ContentContainer>
                  <ErrorBoundary>
                    <Component {...pageProps} />
                  </ErrorBoundary>
                </ContentContainer>
                <Footer/>
              </div>
            </ContextProvider>
          </SolanaWalletProvider>
        </>
    );
}

export default App;
