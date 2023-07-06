import { EditContent } from "components/EditContent";
import { BlogCard } from "components/BlogCard";
import { GetServerSideProps, NextPage } from "next";
import useStaticHooks from "hooks/useStaticHooks";
import useCookies from "hooks/useCookies";
import useApiRequests from "hooks/useApiRequests";

interface Props {
  blogs: {
    content: string;
    title: string;
    published: string;
    id: string;
    slug: string;
    date: string;
  }[];
}

const EditBlogPage: NextPage<Props> = ({ blogs }) => (
  <div>
    <h1 className="text-3xl font-bold my-10 text-center">Admin Blog Editor</h1>
    <EditContent contents={blogs} Child={BlogCard} type="blog" />
  </div>
);

export default EditBlogPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { getToken } = useCookies();
  const { redirect, redirectToLogin } = useStaticHooks();
  const token = await getToken(req, res);

  if (!token) {
    return redirectToLogin();
  }

  try {
    const { getItemsByCategory } = useApiRequests();
    const { data: blogs } = await getItemsByCategory("blogs");

    return {
      props: { blogs },
    };
  } catch (err) {
    console.error(err);
    return redirect("500");
  }
};
