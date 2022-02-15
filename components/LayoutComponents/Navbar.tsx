import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import logo from '/public/hope_icon.webp';

export const Navbar = () => {
  const router = useRouter();
  const onHomePage = router.route === '/';
  return (
    <nav className="h-20 flex items-center p-2 fixed z-20 top-0 left-0 right-0 bg-white filter shadow-lg font-rockSalt text-xs xs:text-sm sm:text-2xl">
      <Link href="/">
        <a className="sm:mx-5 flex items-center">
          <Image src={logo} height={133 / 2} width={120 / 2} />
        </a>
      </Link>
      <div className={onHomePage ? 'hidden' : ''}>
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/blogs">
          <a>Blogs</a>
        </Link>{' '}
        |{' '}
        <Link href="/events">
          <a>Events</a>
        </Link>{' '}
        |{' '}
        <Link href="/social">
          <a>Social Media</a>
        </Link>
      </div>
    </nav>
  );
};
