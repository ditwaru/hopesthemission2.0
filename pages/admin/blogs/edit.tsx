import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { BlogCard } from 'components/Blogs/BlogCard';
import { useRouter } from 'next/router';
import Link from 'next/link';

const EditBlog: NextPage = ({ token, posts }) => {
  if (!token) {
    const router = useRouter();
    router.push('/admin');
    return <div>Redirecting to login</div>;
  }
  return (
    <div className="w-full p-5 max-w-lg">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} url={`edit/${post.id}`}>
          <p>bruh</p>
        </BlogCard>
      ))}
      <Link href="/admin">
        <a className="border rounded-lg px-4 bg-gray-200">Cancel</a>
      </Link>
    </div>
  );
};

export default EditBlog;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;
  const postsResponse = await fetch(`${url}/posts`);
  const posts = await postsResponse.json();

  return {
    props: { token: req.cookies.token || '', posts },
  };
};
