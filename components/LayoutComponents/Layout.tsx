import React, { ReactNode } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Navbar } from 'components/LayoutComponents/Navbar';
import { Footer } from 'components/LayoutComponents/Footer';
import background from '/public/marble-background.webp';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen">
      <Head>
        <title>Hope's the Mission</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="font-nanumGothic pt-24 pb-16 w-11/12 max-w-lg mx-auto">
        <div className="w-screen absolute top-0 left-0 bottom-0 -z-10 ">
          <Image
            src={background}
            layout="fill"
            objectPosition="center"
            priority
          />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
