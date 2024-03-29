import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  // todo: social media page
  return (
    <>
      <NextSeo
        title={`Home - Hope's The Mission`}
        description="This hope is a strong and trustworthy anchor for our souls."
        openGraph={{
          url: `https://www.hopesthemission.com/`,
          title: "Home - Hope's The Mission",
          description: "This hope is a strong and trustworthy anchor for our souls.",
          images: [
            {
              url: process.env.NEXT_PUBLIC_LOGO_URL || "",
              alt: "Hope's the mission image",
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <div>
        <Head>
          <title>Hope&apos;s The Mission</title>
          <meta name="Hope is the mission" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className="font-rockSalt text-black my-10 text-5xl text-center bruh">
          <span className="rattle1">
            <span className="slam1 opacity-0">Hope</span>{" "}
          </span>
          <span className="rattle2">
            <span className="slam2 opacity-0 underline">is</span>{" "}
          </span>
          <span className="rattle3">
            <span className="slam3 opacity-0">The</span>{" "}
          </span>
          <span className="rattle4">
            <span className="slam4 opacity-0">Mission</span>
          </span>
        </h1>

        <section className="m-5">
          <div className="flex flex-col items-center space-y-4 text-slate-200">
            <Link href="/about">
              <a className="p-2 rounded-lg filter drop-shadow-2xl bg-tomato w-full max-w-lg animate-slideLeft slideLeft1 opacity-0">
                <h2 className="text-white text-4xl font-bold font-nanumPen">About &rarr;</h2>
                <p className="text-xl">What&apos;s our mission?</p>
              </a>
            </Link>
            <Link href="/blogs">
              <a className="p-2 rounded-lg filter drop-shadow-2xl bg-tomato w-full max-w-lg animate-slideRight slideRight1 opacity-0">
                <h2 className="text-white font-bold font-nanumPen text-4xl">Blogs &rarr;</h2>
                <p className="text-xl">Random thoughts and rants</p>
              </a>
            </Link>
            <Link href="/events">
              <a className="p-2 rounded-lg filter drop-shadow-2xl bg-tomato w-full max-w-lg animate-slideLeft slideLeft2 opacity-0">
                <h2 className="text-white font-bold font-nanumPen text-4xl">Events &rarr;</h2>
                <p className="text-xl">Come hang out with us</p>
              </a>
            </Link>
            <Link href="/social">
              <a className="p-2 rounded-lg filter drop-shadow-2xl bg-tomato w-full max-w-lg animate-slideRight slideRight2 opacity-0">
                <h2 className="text-white font-bold font-nanumPen text-4xl">Social Media &rarr;</h2>
                <p className="text-xl">Follow me on social media!</p>
              </a>
            </Link>
            {/* <Link href="/sponsor">
            <a className="p-2 rounded-lg filter drop-shadow-2xl bg-tomato w-full max-w-lg">
              <h2 className="text-white font-bold font-nanumPen text-3xl">
                Sponsor a missionary &rarr;
              </h2>
              <p className="text-xl"></p>
            </a>
          </Link> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
