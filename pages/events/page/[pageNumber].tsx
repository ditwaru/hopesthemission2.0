import { EventCard } from 'components/EventCard';
import { Pagination } from 'components/Pagination';
import { filterOldEvents } from 'lib/filterOldEvents';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

const EventsPage: NextPage = ({ events, pageNumbers, currentPage }) => {
  return (
    <>
      <h1 className="text-5xl mt-5">Events 🗓</h1>
      <div className="w-screen m-5 max-w-lg space-y-5">
        {events.map((event) => (
          <EventCard key={event.id} event={event} url={event.slug} />
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
  const res = await fetch(`http://localhost:1338/events`);
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { pageNumber } = params;

  // have to do this bc next doesnt allow sharing data from getstaticpaths to here
  const totalEventPages = await fetch(`http://localhost:1338/events`);
  const totalEventsPageJson = await totalEventPages.json();
  const pageNumbers = +Math.ceil(totalEventsPageJson.length / 5);

  const res = await fetch(
    `http://localhost:1338/events?page=${pageNumber}&limit=5`
  );
  const data = await res.json();

  // const filteredEvents = filterOldEvents(new Date(), data);

  return {
    props: { events: data, currentPage: +pageNumber, pageNumbers },
  };
};
