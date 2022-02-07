import { dateConverter } from 'lib/dateConverter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

const BlogsPage: NextPage = ({ blog }) => {
  console.log(blog);
  return (
    <section className="max-w-lg w-full m-5">
      <h1 className="font-bold text-4xl text-purple-600">{blog.title}</h1>
      {blog.Image && (
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${blog.Image.url}`}
          height={300}
          width={300}
        />
      )}
      <p className="mb-5 text-xs mt-2">
        Published: {dateConverter(blog.published)}
      </p>
      <p className="">{blog.body}</p>
    </section>
  );
};

export default BlogsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs`);
  const blogs = await res.json();

  const paths = blogs.map((blog) => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${slug}`
  );
  const blog = await res.json();

  return {
    props: {
      blog: blog[0],
    },
  };
};
