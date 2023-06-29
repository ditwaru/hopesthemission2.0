import { dateConverter } from "utils/dateConverter";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import useStaticHooks from "hooks/useStaticHooks";

interface Props {
  event: {
    imageUrl?: string;
    date: string;
    title: string;
    content: string;
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
          description: "This hope is a strong and trustworthy anchor for our souls.",
          images: [
            {
              url: event.imageUrl ?? (process.env.NEXT_PUBLIC_LOGO_URL || ""),
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
      <section>
        {event.imageUrl && (
          <div className="relative w-full h-64">
            <Image src={event.imageUrl} layout="fill" objectPosition="center" objectFit="cover" priority />
          </div>
        )}
        <p className="text-semibold text-md text-red-700 mt-3">{dateConverter(+event.date)}</p>
        <h1 className="font-bold text-5xl text-red-700 mb-5 font-nanumPen">{event.title}</h1>
        <p className="whitespace-pre-wrap">{event.content}</p>
      </section>
    </>
  );
};

export default EventPage;

export const getStaticPaths = async () => {
  const { getCommonPathsForSingleItems } = useStaticHooks();
  return getCommonPathsForSingleItems("events");
};

export const getStaticProps = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { getCommonPropsForSingleItems, redirect } = useStaticHooks();
  try {
    return getCommonPropsForSingleItems(slug, "events");
  } catch (error) {
    console.error(error);
    return redirect("500");
  }
};
