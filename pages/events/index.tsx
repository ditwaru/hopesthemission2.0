import { EventCard } from 'components/Events/EventCard';
import { filterOldEvents } from 'lib/filterOldEvents';
import { GetStaticProps, NextPage } from 'next';

const EventsPage: NextPage = ({ data }) => {
  return (
    <>
      <h1 className="text-5xl mt-5">Events 🗓</h1>
      <div className="my-5 w-full p-5 max-w-lg">
        {data.map((event) => (
          <EventCard key={event.id} event={event} url={event.Slug} />
        ))}
      </div>
    </>
  );
};

export default EventsPage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/events`);
  const data = await res.json();
  const filteredEvents = filterOldEvents(data);

  return {
    props: { data: filteredEvents },
  };
};
