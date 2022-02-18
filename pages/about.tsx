import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  about: {
    title: string;
    body: string;
    bannerImages: { height: number; width: number; url: string }[];
  };
}
const AboutPage = ({ about }: Props) => {
  const [currentImage, setCurrentImage] = useState(
    about.bannerImages[Math.floor(Math.random() * 26)]
  );

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentImage(about.bannerImages[Math.floor(Math.random() * 26)]),
      8000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <NextSeo
        title={`About - Hope's The Mission`}
        description="This hope is a strong and trustworthy anchor for our souls."
        openGraph={{
          url: `https://www.hopesthemission.com/about`,
          title: 'About',
          description:
            'This hope is a strong and trustworthy anchor for our souls.',
          images: [
            {
              url: currentImage.url ?? '/public/logo.png',
              alt: "Hope's the mission image",
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <section>
        {about.bannerImages.length > 0 && (
          <div
            key={currentImage.url}
            className="text-center opacity-0 fade drop-shadow-xl"
          >
            <Image
              src={currentImage.url}
              height={currentImage.height / 4}
              width={currentImage.width / 4}
              className="rounded-lg"
            />
          </div>
        )}
        <h1 className="text-5xl font-bold font-nanumPen">{about.title}</h1>
        <p className="whitespace-pre-wrap">{about.body}</p>
      </section>
    </>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/about`);
  const about = await res.json();

  return {
    props: { about: about[0] },
    revalidate: 30,
  };
};
