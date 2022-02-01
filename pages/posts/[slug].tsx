import { dateConverter } from 'lib/dateConverter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

const PostPage: NextPage = ({ post }) => {
  console.log(post);
  return (
    <section className="max-w-lg w-full p-5">
      <h1 className="font-bold text-4xl text-purple-600">{post.Title}</h1>
      {post.Image && (
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.Image.url}`}
          height={300}
          width={300}
        />
      )}
      <p className="mb-5 text-xs mt-2">
        Published: {dateConverter(post.published_at)}
      </p>
      <p className="">{post.Content}</p>
    </section>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts`);
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: post.Slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/posts?Slug=${slug}`
  );
  const data = await res.json();
  const post = data[0];

  return {
    props: {
      post,
    },
  };
};
