import { NextPage } from "next";
import { BlogCard } from "components/BlogCard";
import { Pagination } from "components/Pagination";
import { NextSeo } from "next-seo";
import useStaticHooks from "hooks/useStaticHooks";

interface Props {
  blogs: {
    title: string;
    body: string;
    id: string;
    slug: string;
  }[];
  pageNumbers: number;
  currentPage: number;
}

const BlogsPage: NextPage<Props> = ({ blogs, pageNumbers, currentPage }) => {
  return (
    <>
      <NextSeo
        title={`Blogs - Hope's The Mission`}
        description="This hope is a strong and trustworthy anchor for our souls."
        openGraph={{
          url: `https://www.hopesthemission.com/blogs/page/${currentPage}`,
          title: "Blogs - Hope's The Mission",
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
      <div>
        <h1 className="text-5xl text-center font-rockSalt mt-5">Blogs 📑</h1>
        <h3 className="text-center font-nanumPen text-4xl  my-5">Random thoughts and rants</h3>
        <div className="space-y-5">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} slug={blog.slug} />
          ))}
          <Pagination pageNumbers={pageNumbers} currentPage={currentPage} type="blogs" />
        </div>
      </div>
    </>
  );
};

export default BlogsPage;

export const getStaticPaths = async () => {
  const { getCommonPathsForCategory, redirect } = useStaticHooks();
  try {
    return await getCommonPathsForCategory("blogs");
  } catch (err) {
    console.error(err);
    return redirect("500");
  }
};

export const getStaticProps = async ({ params: { pageNumber } }: { params: { pageNumber: string } }) => {
  const { getCommonPropsForCategory, redirect } = useStaticHooks();
  try {
    return await getCommonPropsForCategory("blogs", pageNumber);
  } catch (error) {
    console.error(error);
    return redirect("500");
  }
};
