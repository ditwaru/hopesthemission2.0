import { EventCard } from 'components/EventCard';
import { GetServerSideProps, NextPage } from 'next';
import { filterOldEvents } from 'lib/filterOldEvents';
import { LoginRedirect } from 'components/LoginRedirect';
import { EditContent } from 'components/EditContent';

const EditEvent: NextPage = ({ token, events }) => {
  {
    console.log(events);
    return token ? (
      <>
        <h1 className="text-3xl font-bold my-10">Admin Events Editor</h1>
        <EditContent contents={events} Child={EventCard} type="event" />
      </>
    ) : (
      <LoginRedirect />
    );
  }
};

export default EditEvent;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  const eventsResponse = await fetch(`${url}/events`);
  const events = await eventsResponse.json();

  return {
    props: { token: req.cookies.token || '', events },
  };
};
