import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Navbar } from 'components/LayoutComponents/Navbar';
import { Footer } from 'components/LayoutComponents/Footer';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen bg-teal-100">
      <Head>
        <title>Hope's the Mission</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="font-patrickHand pt-20 pb-16 w-11/12 max-w-lg mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
