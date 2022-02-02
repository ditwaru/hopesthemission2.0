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
    <div className="flex justify-center items-center relative min-h-screen bg-teal-100">
      <Head>
        <title>Hope's the Mission</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="flex flex-col justify-center items-center font-patrickHand">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
