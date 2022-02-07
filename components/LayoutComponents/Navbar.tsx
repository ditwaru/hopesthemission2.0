import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import logo from '/public/logo.png';

export const Navbar = () => {
  const router = useRouter();
  const onHomePage = router.route === '/';
  return (
    <nav
      className={`${
        onHomePage ? 'h-14' : 'flex items-center'
      } p-2 fixed z-20 top-0 left-0 right-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 filter shadow-lg font-shadowsIntoLight sm:text-2xl`}
    >
      <div
        className={
          onHomePage ? 'absolute left-1/2 transform -translate-x-1/2' : ''
        }
      >
        <Link href="/">
          <a className="sm:mx-5">
            <Image src={logo} height={35} width={35} />
          </a>
        </Link>
      </div>
      <div className={onHomePage ? 'hidden' : ''}>
        <Link href="/blogs">
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
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
        <a href="/admin">
          <p>Admin</p>
        </a>
      </div>
    </nav>
  );
};
