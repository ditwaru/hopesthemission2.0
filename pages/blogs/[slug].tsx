import { dateConverter } from "utils/dateConverter";
import { NextPage } from "next";
import Image from "next/image";
import { NextSeo } from "next-seo";
import useStaticHooks from "hooks/useStaticHooks";

interface Props {
  blog: {
    imageUrl?: string;
    title: string;
    published: number;
    content: string;
    slug: string;
  };
}

const BlogsPage: NextPage<Props> = ({ blog }) => {
  return (
    <>
      <NextSeo
        title={`${blog.title} - Hope's The Mission`}
        description="This hope is a strong and trustworthy anchor for our souls."
        openGraph={{
          url: `https://www.hopesthemission.com/blogs/${blog.slug}`,
          title: blog.title,
          description: "This hope is a strong and trustworthy anchor for our souls.",
          images: [
            {
              url: blog.imageUrl ?? (process.env.NEXT_PUBLIC_LOGO_URL || ""),
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
        {blog.imageUrl && (
          <div className="relative w-full h-64">
            <Image src={blog.imageUrl} layout="fill" objectPosition="center" priority />
          </div>
        )}
        <h1 className="font-bold text-5xl font-nanumPen">{blog.title}</h1>
        <p className="mb-5 text-xs mt-2">Published: {dateConverter(+blog.published)}</p>
        <p className="whitespace-pre-wrap">{blog.content}</p>
      </section>
    </>
  );
};

export default BlogsPage;

export const getStaticPaths = async () => {
  const { getCommonPathsForSingleItems, redirect } = useStaticHooks();
  try {
    return getCommonPathsForSingleItems("blogs");
  } catch (error) {
    console.error(error);
  }
};

export const getStaticProps = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { getCommonPropsForSingleItems, redirect } = useStaticHooks();
  try {
    return getCommonPropsForSingleItems(slug, "blogs");
  } catch (error) {
    console.error(error);
    return redirect("500");
  }
};
