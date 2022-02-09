import { dateConverter } from 'lib/dateConverter';
import { GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';

interface Props {
  blog: {
    imageURL: string;
    title: string;
    published: string;
    body: string;
  };
}

const BlogsPage: NextPage<Props> = ({ blog }) => {
  return (
    <section className="max-w-lg w-full m-5">
      <h1 className="font-bold text-4xl text-purple-600">{blog.title}</h1>
      {blog.imageURL && (
        <div className="absolute w-48 h-48">
          <Image
            src={blog.imageURL}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        </div>
      )}
      <p className="mb-5 text-xs mt-2">
        Published: {dateConverter(blog.published)}
      </p>
      <p className="whitespace-pre-wrap">{blog.body}</p>
    </section>
  );
};

export default BlogsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs`);
  const blogs: { slug: string }[] = await res.json();

  const paths = blogs.map((blog) => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${slug}`
  );
  const blog = await res.json();

  return {
    props: {
      blog: blog[0],
    },
    revalidate: 30,
  };
};