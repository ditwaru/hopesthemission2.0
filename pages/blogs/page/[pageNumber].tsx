import { GetStaticPaths, NextPage } from 'next';
import { BlogCard } from 'components/BlogCard';
import { Pagination } from 'components/Pagination';
import { NextSeo } from 'next-seo';

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
          description:
            'This hope is a strong and trustworthy anchor for our souls.',
          images: [
            {
              url: '/public/logo.png',
              alt: "Hope's the mission image",
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <div>
        <h1 className="text-5xl text-center font-rockSalt mt-5">Blogs 📑</h1>
        <h3 className="text-center font-nanumPen text-4xl  my-5">
          Random thoughts and rants
        </h3>
        <div className="space-y-5">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} slug={blog.slug} />
          ))}
          <Pagination
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            type="blogs"
          />
        </div>
      </div>
    </>
  );
};

export default BlogsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs`);
  const blogs = await res.json();

  const paths = Array.from(
    { length: Math.ceil(blogs.length / 5) },
    (blog, i) => ({
      params: { pageNumber: (i + 1).toString() },
    })
  ); //this convoluted thing just makes a new array with a length of ${total} / ${limit}

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { pageNumber: string };
}) => {
  const { pageNumber } = params;

  // have to do this bc next doesnt allow sharing data from getstaticpaths to here
  const totalBlogPages = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs`
  );
  const totalBlogsPageJson = await totalBlogPages.json();
  const pageNumbers = +Math.ceil(totalBlogsPageJson.length / 5);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs?page=${pageNumber}&limit=5`
  );
  const blogs = await res.json();
  return {
    props: { blogs, pageNumbers, currentPage: +pageNumber },
    revalidate: 30,
  };
};
