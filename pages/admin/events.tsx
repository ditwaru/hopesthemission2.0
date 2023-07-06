import { EventCard } from "components/EventCard";
import { GetServerSideProps, NextPage } from "next";
import { EditContent } from "components/EditContent";
import useCookies from "hooks/useCookies";
import useStaticHooks from "hooks/useStaticHooks";
import useApiRequests from "hooks/useApiRequests";

interface Props {
  events: {
    content: string;
    title: string;
    published: string;
    id: string;
    slug: string;
    date: string;
  }[];
}

const EditEvent: NextPage<Props> = ({ events }) => (
  <>
    <h1 className="text-3xl font-bold my-10">Admin Events Editor</h1>
    <EditContent contents={events} Child={EventCard} type="event" />
  </>
);

export default EditEvent;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { getToken } = useCookies();
  const { redirect, redirectToLogin } = useStaticHooks();
  const token = await getToken(req, res);
  if (!token) {
    return redirectToLogin();
  }

  try {
    const { getItemsByCategory } = useApiRequests();
    const { data: events } = await getItemsByCategory("events");

    return {
      props: { events },
    };
  } catch (err) {
    console.error(err);
    return redirect("500");
  }
};
