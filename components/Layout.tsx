import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '/public/logo.png';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const router = useRouter();
  const onHomePage = router.route === '/';

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav
          className={`${
            onHomePage ? 'h-14' : 'flex items-center'
          } p-2 fixed top-0 bg-white w-full filter shadow-lg`}
        >
          <div
            className={
              onHomePage ? 'absolute left-1/2 transform -translate-x-1/2' : ''
            }
          >
            <Link href="/">
              <a>
                <Image src={logo} height={35} width={35} />
              </a>
            </Link>
          </div>
          <div className={onHomePage ? 'hidden' : ''}>
            <Link href="/posts">
              <a>Blogs</a>
            </Link>{' '}
            |{' '}
            <Link href="/events">
              <a>Events</a>
            </Link>{' '}
            |{' '}
            <Link href="/about">
              <a>About</a>
            </Link>
          </div>
          <div className="absolute right-2 top-4">
            <Link href="/admin">
              <a>Admin</a>
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex flex-col justify-center items-center pb-10 pt-20">
        {children}
      </main>
      <footer className="w-full absolute bottom-0 h-10 bg-white flex justify-center items-center">
        <span>Hopes the mission 2021</span>
      </footer>
    </div>
  );
};

export default Layout;
