import useApiRequests from "hooks/useApiRequests";
import useStaticHooks from "hooks/useStaticHooks";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  content: string;
  bannerImages: string[];
}
const AboutPage = ({ content, title, bannerImages }: Props) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const index = imageIndex === bannerImages.length - 1 ? 0 : imageIndex + 1;
      return setImageIndex(index);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [imageIndex]);

  return (
    <>
      <NextSeo
        title={`About - Hope's The Mission`}
        description="This hope is a strong and trustworthy anchor for our souls."
        openGraph={{
          url: `https://www.hopesthemission.com/about`,
          title: "About",
          description: "This hope is a strong and trustworthy anchor for our souls.",
          images: [
            {
              url: bannerImages[imageIndex] ?? (process.env.NEXT_PUBLIC_LOGO_URL || ""),
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
        {bannerImages.length > 0 && (
          <div
            key={bannerImages[imageIndex]}
            className="absolute top-24 left-0 transform translate-x-1/2 opacity-0 fade drop-shadow-xl w-1/2 max-w-screen-lg h-80"
          >
            <Image src={bannerImages[imageIndex]} className="rounded-lg" layout="fill" objectFit="none" />
          </div>
        )}
        <h1 className="text-5xl font-bold font-nanumPen mt-80">{title}</h1>
        <p className="whitespace-pre-wrap">{content}</p>
      </section>
    </>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
  const { redirect } = useStaticHooks();

  try {
    const { getItemsByCategory } = useApiRequests();
    const { data } = await getItemsByCategory("about");

    const content = data?.find(({ id }: { id: string }) => id === "content")?.content || null;
    const title = data?.find(({ id }: { id: string }) => id === "title")?.title || null;
    const imageArray: string[] =
      data?.reduce((acc: string[], { imageUrl }: { imageUrl: string }) => {
        if (imageUrl) {
          acc.push(imageUrl);
        }
        return acc;
      }, []) || null;

    // const bannerImages = imageArray?.map((imageUrl) => {
    //   return `/about/${imageUrl.split("/about/")[1]}`;
    // });
    // TODO see if you can figure something out about downloading the files from s3 then displaying the downloaded images
    return {
      props: { content, title, bannerImages: imageArray },
      revalidate: 30,
    };
  } catch (error) {
    console.error(error);
    return redirect("500");
  }
};
