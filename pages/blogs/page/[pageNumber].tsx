import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { BlogCard } from 'components/BlogCard';
import { Pagination } from 'components/Pagination';

const BlogsPage: NextPage = ({ blogs, pageNumbers, currentPage }) => {
  return (
    <>
      <h1 className="text-5xl mt-5">Blogs 📑</h1>
      <div className="w-screen m-5 max-w-lg space-y-5">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} slug={blog.slug} />
        ))}
        <Pagination
          pageNumbers={pageNumbers}
          currentPage={currentPage}
          type="blogs"
        />
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
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { pageNumber } = params;

  // have to do this bc next doesnt allow sharing data from getstaticpaths to here
  const totalBlogPages = await fetch(`http://localhost:1338/blogs`);
  const totalBlogsPageJson = await totalBlogPages.json();
  const pageNumbers = +Math.ceil(totalBlogsPageJson.length / 5);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs?page=${pageNumber}&limit=5`
  );
  const blogs = await res.json();
  return {
    props: { blogs, pageNumbers, currentPage: +pageNumber },
  };
};
