import { useState } from 'react';
import Link from 'next/link';
import { monthConverter } from 'lib/monthConverter';
import { EventCard } from 'components/Events//EventCard';
import { GetServerSideProps, NextPage } from 'next';
import { filterOldEvents } from 'lib/filterOldEvents';
import { useRouter } from 'next/router';

const EditEvent: NextPage = ({ token, events }) => {
  if (!token) {
    if (!token) {
      const router = useRouter();
      router.push('/admin');
      return <div>Redirecting to login</div>;
    }
  }
  return (
    <div className="my-5 w-full p-5 max-w-lg">
      {events.map((event) => {
        return (
          <EventCard
            key={event.id}
            event={event}
            url={`edit/${event.id}`}
          ></EventCard>
        );
      })}
      <Link href="/admin">
        <a className="border rounded-lg px-4 bg-gray-200">Cancel</a>
      </Link>
    </div>
  );
};

export default EditEvent;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;

  const eventsResponse = await fetch(`${url}/events`);
  const events = await eventsResponse.json();
  const filteredEvents = filterOldEvents(events);

  return {
    props: { token: req.cookies.token || '', events: filteredEvents },
  };
};
