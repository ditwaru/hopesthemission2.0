import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  home: {
    imageURL: string;
    title: string;
  };
}

const Home: NextPage<Props> = ({ home }) => {
  // todo: social media page, typescript, upload pictures through admin dashboard, logout button for admin dashboard
  return (
    <div>
      <Head>
        <title>Hope's The Mission</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="m-5">
        <div className="w-screen absolute top-0 left-0 bottom-0 z-0 ">
          {home.imageURL && (
            <Image
              src={home.imageURL}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              priority
            />
          )}
        </div>

        <h1
          id="mainTitle"
          className="sm:my-10 my-5 text-2xl sm:text-5xl font-bold relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-300 drop-shadow-2xl"
        >
          {home.title}
        </h1>

        <div className="flex flex-col items-center space-y-2">
          <Link href="/about">
            <a className="border p-2 rounded-lg filter drop-shadow-lg bg-white hover:scale-110 transition-all duration-300 w-full max-w-lg">
              <h2 className="text-xl font-bold">About &rarr;</h2>
              <p>About Hope's The Mission</p>
            </a>
          </Link>
          <Link href="/posts">
            <a className="border p-2 rounded-lg filter drop-shadow-lg bg-white hover:scale-110 transition-all duration-300 w-full max-w-lg">
              <h2 className="font-bold text-xl">Blogs &rarr;</h2>
              <p>The wonderful world of blogs</p>
            </a>
          </Link>
          <Link href="/events">
            <a className="border p-2 rounded-lg filter drop-shadow-lg bg-white hover:scale-110 transition-all duration-300 w-full max-w-lg">
              <h2 className="font-bold text-xl">Events &rarr;</h2>
              <p>All the events</p>
            </a>
          </Link>

          <Link href="/social">
            <a className="border p-2 rounded-lg filter drop-shadow-lg bg-white hover:scale-110 transition-all duration-300 w-full max-w-lg">
              <h2 className="font-bold text-xl">Social Media &rarr;</h2>
              <p>Follow me on social media!</p>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/home`);
  const home = await res.json();

  return {
    props: { home: home[0] },
  };
};
