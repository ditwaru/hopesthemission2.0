import { dateConverter } from 'lib/dateConverter';
import { GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

interface Props {
  blog: {
    imageURL?: string;
    title: string;
    published: number;
    body: string;
    slug: string;
  };
}

const BlogsPage: NextPage<Props> = ({ blog }) => {
  return (
    <>
      <NextSeo
        title={`${blog.title} - Hope's The Mission`}
        description="This hope is a strong and trustworthy anchor for our souls. It leads us through the curtain into God’s inner sanctuary."
        openGraph={{
          url: `https://www.hopesthemission.com/${blog.slug}`,
          title: blog.title,
          description:
            'This hope is a strong and trustworthy anchor for our souls. It leads us through the curtain into God’s inner sanctuary.',
          images: [
            {
              url: blog.imageURL ?? '/public/logo.png',
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
      <section>
        {blog.imageURL && (
          <div className="relative w-full h-64">
            <Image
              src={blog.imageURL}
              layout="fill"
              objectPosition="center"
              priority
            />
          </div>
        )}
        <h1 className="font-bold text-5xl font-nanumPen">{blog.title}</h1>
        <p className="mb-5 text-xs mt-2">
          Published: {dateConverter(blog.published)}
        </p>
        <p className="whitespace-pre-wrap">{blog.body}</p>
      </section>
    </>
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
    fallback: 'blocking',
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
