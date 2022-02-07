import { dateConverter } from 'lib/dateConverter';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

const EventPage: NextPage = ({ event }) => {
  return (
    <section className="w-full max-w-lg m-5">
      <p className="text-semibold text-md text-red-700 mt-3">
        {dateConverter(event.date)}
      </p>
      <h1 className="font-bold text-4xl text-red-700 mb-5">{event.title}</h1>
      <p>{event.body}</p>
    </section>
  );
};

export default EventPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`);
  const events = await res.json();

  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/events/${slug}`
  );

  const event = await res.json();
  return {
    props: {
      event,
    },
  };
};
