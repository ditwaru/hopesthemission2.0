import { LoginRedirect } from 'components/LoginRedirect';
import { EditContent } from 'components/EditContent';
import { BlogCard } from 'components/BlogCard';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  token: string;
  blogs: {
    body: string;
    title: string;
    published: string;
    id: string;
    slug: string;
  }[];
}

const EditBlogPage: NextPage<Props> = ({ token, blogs }) =>
  token ? (
    <>
      <h1 className="text-3xl font-bold my-10">Admin Blog Editor</h1>
      <EditContent contents={blogs} Child={BlogCard} type="blog" />
    </>
  ) : (
    <LoginRedirect />
  );
export default EditBlogPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const blogsResponse = await fetch(`${url}/blogs`);
  const blogs = await blogsResponse.json();

  return {
    props: { token: req.cookies.token || '', blogs },
  };
};
