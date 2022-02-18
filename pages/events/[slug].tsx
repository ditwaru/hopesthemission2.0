import { dateConverter } from 'lib/dateConverter';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

interface Props {
  event: {
    imageURL?: string;
    date: number;
    title: string;
    body: string;
    slug: string;
  };
}
const EventPage: NextPage<Props> = ({ event }) => {
  return (
    <>
      <NextSeo
        title={`${event.title} - Hope's The Mission`}
        description="This hope is a strong and trustworthy anchor for our souls."
        openGraph={{
          url: `https://www.hopesthemission.com/events/${event.slug}`,
          title: event.title,
          description:
            'This hope is a strong and trustworthy anchor for our souls.',
          images: [
            {
              url: event.imageURL ?? (process.env.NEXT_PUBLIC_LOGO_URL || ''),
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
        {event.imageURL && (
          <div className="relative w-full h-64">
            <Image
              src={event.imageURL}
              layout="fill"
              objectPosition="center"
              objectFit="cover"
              priority
            />
          </div>
        )}
        <p className="text-semibold text-md text-red-700 mt-3">
          {dateConverter(event.date)}
        </p>
        <h1 className="font-bold text-5xl text-red-700 mb-5 font-nanumPen">
          {event.title}
        </h1>
        <p className="whitespace-pre-wrap">{event.body}</p>
      </section>
    </>
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
    fallback: 'blocking',
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
