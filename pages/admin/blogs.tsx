import { LoginRedirect } from 'components/LoginRedirect';
import { EditContent } from 'components/EditContent';
import { BlogCard } from 'components/BlogCard';
import { GetServerSideProps, NextPage } from 'next';

const EditBlogPage: NextPage = ({ token, posts }) =>
  token ? (
    <>
      <h1 className="text-3xl font-bold my-10">Admin Blog Editor</h1>
      <EditContent contents={posts} Child={BlogCard} type="blog" />
    </>
  ) : (
    <LoginRedirect />
  );
export default EditBlogPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;
  const postsResponse = await fetch(`${url}/posts`);
  const posts = await postsResponse.json();

  return {
    props: { token: req.cookies.token || '', posts },
  };
};
