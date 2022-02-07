import { GetStaticProps } from 'next';
import Image from 'next/image';
const AboutPage = ({ about }) => {
  return (
    <section className="max-w-lg w-full m-5 flex flex-col justify-center">
      <h1 className="text-4xl font-bold">{about.title}</h1>
      <p>{about.body}</p>
      {about.image && (
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${about.Image.url}`}
          width={400}
          height={300}
        />
      )}
    </section>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/about`);
  const about = await res.json();

  return {
    props: { about: about[0] },
  };
};
