import { dateConverter } from 'lib/dateConverter';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';

interface Props {
  event: {
    imageURL: string;
    date: string;
    title: string;
    body: string;
  };
}
const EventPage: NextPage<Props> = ({ event }) => {
  return (
    <section className="w-full max-w-lg m-5">
      {event.imageURL && (
        <div className="w-screen h-96 top-14 left-0 absolute">
          <Image
            src={event.imageURL}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        </div>
      )}
      <p className="text-semibold text-md text-red-700 mt-3">
        {dateConverter(event.date)}
      </p>
      <h1 className="font-bold text-4xl text-red-700 mb-5">{event.title}</h1>
      <p className="whitespace-pre-wrap">{event.body}</p>
    </section>
  );
};

export default EventPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`);
  const events: { slug: string }[] = await res.json();

  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/events/${slug}`
  );

  const event = await res.json();
  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};
