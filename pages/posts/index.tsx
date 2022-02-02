import { GetStaticProps, NextPage } from 'next';
import { BlogCard } from 'components/BlogCard';

const PostsPage: NextPage = ({ data }) => {
  return (
    <>
      <h1 className="text-5xl mt-5">Blogs 📑</h1>
      <div className="w-screen m-5 max-w-lg space-y-5">
        {data.map((post) => (
          <BlogCard key={post.id} post={post} url={post.Slug} />
        ))}
      </div>
    </>
  );
};

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts`);
  const data = await res.json();
  return {
    props: { data },
  };
};
