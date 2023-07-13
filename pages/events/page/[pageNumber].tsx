import { EventCard } from "components/EventCard";
import { Pagination } from "components/common/Pagination";
import { filterOldEvents } from "utils/filterOldEvents";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import useStaticHooks from "hooks/useStaticHooks";
import { redirect } from "next/dist/server/api-utils";

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
  if (events.length > 0)
    return (
      <>
        <NextSeo
          title={`Events - Hope's The Mission`}
          description="This hope is a strong and trustworthy anchor for our souls."
          openGraph={{
            url: `https://www.hopesthemission.com/events/page/${currentPage}`,
            title: "Events - Hope's The Mission",
            description: "This hope is a strong and trustworthy anchor for our souls.",
            images: [
              {
                url: process.env.NEXT_PUBLIC_LOGO_URL || "",
                alt: "Hope's the mission image",
              },
            ],
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
        <h1 className="text-5xl my-5 text-center font-rockSalt">Events 🗓</h1>
        <h3 className="text-center font-nanumPen text-4xl mb-5">Come hang out with us</h3>
        <div className="space-y-5">
          {events.map((event) => (
            <EventCard key={event.id} event={event} slug={event.slug} />
          ))}
          <Pagination pageNumbers={pageNumbers} currentPage={currentPage} type="events" />
        </div>
      </>
    );
  return <h1 className="text-3xl my-5 text-center font-rockSalt">There are no upcoming events at this time</h1>;
};

export default EventsPage;

export const getStaticPaths = async () => {
  const { getCommonPathsForCategory, redirect } = useStaticHooks();
  try {
    return await getCommonPathsForCategory("events");
  } catch (err) {
    console.error(err);
    return redirect("500");
  }
};

export const getStaticProps = async ({ params: { pageNumber } }: { params: { pageNumber: string } }) => {
  const { getCommonPropsForCategory, redirect } = useStaticHooks();
  try {
    return await getCommonPropsForCategory("events", pageNumber);
  } catch (error) {
    console.error(error);
    return redirect("500");
  }
};
