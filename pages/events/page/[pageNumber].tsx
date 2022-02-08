import { EventCard } from 'components/EventCard';
import { Pagination } from 'components/Pagination';
import { filterOldEvents } from 'lib/filterOldEvents';
import { GetStaticPaths, NextPage } from 'next';

interface Props {
  events: {
    id: string;
    slug: string;
    date: string;
    title: string;
    body: string;
  }[];
  pageNumbers: number;
  currentPage: number;
}

const EventsPage: NextPage<Props> = ({ events, pageNumbers, currentPage }) => {
  return (
    <>
      <h1 className="text-5xl mt-5">Events 🗓</h1>
      <div className="w-screen m-5 max-w-lg space-y-5">
        {events.map((event) => (
          <EventCard key={event.id} event={event} slug={event.slug} />
        ))}
        <Pagination
          pageNumbers={pageNumbers}
          currentPage={currentPage}
          type="events"
        />
      </div>
    </>
  );
};

export default EventsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`);
  const events = await res.json();
  const totalPages = Math.ceil(events.length / 5);

  const paths = Array.from({ length: totalPages }, (event, i) => ({
    params: { pageNumber: (i + 1).toString() },
  })); //this convoluted thing just makes a new array with a length of ${total} / ${limit}

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { pageNumber: string };
}) => {
  const { pageNumber } = params;

  // have to do this bc next doesnt allow sharing data from getstaticpaths to here
  const totalEventPages = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/events`
  );
  const totalEventsPageJson = await totalEventPages.json();
  const pageNumbers = +Math.ceil(totalEventsPageJson.length / 5);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/events?page=${pageNumber}&limit=5`
  );
  const data = await res.json();

  // const filteredEvents = filterOldEvents(new Date(), data);

  return {
    props: { events: data, currentPage: +pageNumber, pageNumbers },
  };
};
