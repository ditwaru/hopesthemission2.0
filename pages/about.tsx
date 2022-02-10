import { GetStaticProps } from 'next';
import Image from 'next/image';

interface Props {
  about: { title: string; body: string; imageURL?: string };
}
const AboutPage = ({ about }: Props) => {
  return (
    <section>
      <h1 className="text-4xl font-bold">{about.title}</h1>
      <p>{about.body}</p>
      {about.imageURL && (
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${about.imageURL}`}
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
    revalidate: 30,
  };
};
