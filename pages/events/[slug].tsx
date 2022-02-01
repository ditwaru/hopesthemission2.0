import { dateConverter } from 'lib/dateConverter';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

const EventPage: NextPage = ({ event }) => {
  return (
    <section className="w-full max-w-lg p-5">
      <p className="text-semibold text-md text-red-700 mt-3">
        {dateConverter(event.Date)}
      </p>
      <h1 className="font-bold text-4xl text-red-700 mb-5">{event.Title}</h1>
      <p>{event.Content}</p>
    </section>
  );
};

export default EventPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/events`);
  const events = await res.json();

  const paths = events.map((post) => ({
    params: { slug: post.Slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/events?Slug=${slug}`
  );

  const data = await res.json();
  const event = data[0];

  return {
    props: {
      event,
    },
  };
};
