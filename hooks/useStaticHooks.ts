import useApiRequests from "./useApiRequests";
import useFiles from "./useFiles";
import { GetStaticPathsResult, GetStaticPropsResult } from "next";

const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN;

const getCommonPathsForSingleItems = async (category: string): Promise<GetStaticPathsResult> => {
  const { writeParamsFile } = useFiles();
  const { getItemsByCategory } = useApiRequests();
  const { data } = await getItemsByCategory(category);
  const paths = data.map(({ slug, id }: { slug: string; id: string }) => {
    const params = { slug, id };
    return { params };
  });
  await writeParamsFile(paths);
  return {
    paths,
    fallback: "blocking",
  };
};

const getCommonPropsForSingleItems = async (
  slug: string,
  category: string
): Promise<GetStaticPropsResult<{ [key: string]: unknown }>> => {
  try {
    const { getParamsData, deleteTmpFile } = useFiles();
    const { getItemById } = useApiRequests();
    const fileData = await getParamsData();
    const {
      params: { id },
    } = fileData?.find(({ params }: { params: { slug: string } }) => params.slug === slug);
    const { data } = await getItemById(category, id);
    await deleteTmpFile();
    return {
      props: {
        [category.substring(0, category.length - 1)]: data, // so blogs will return as blog
      },
      revalidate: 30,
    };
  } catch (err) {
    console.log(err);
    return redirect("404"); // this is necessary so blogs not paths not rendered by getStaticPaths don't fail on this function
  }
};

const getCommonPathsForCategory = async (category: string) => {
  const { writeParamsFile } = useFiles();
  const { getItemsByCategory } = useApiRequests();

  const { data } = await getItemsByCategory(category);

  const paths = Array.from({ length: Math.ceil(data.length / 5) }, (_, i) => {
    const params = { pageNumber: (i + 1).toString() };
    return { params };
  }); //this convoluted thing just makes a new array with a length of ${total} / ${limit}

  writeParamsFile(paths);
  return {
    paths,
    fallback: "blocking",
  };
};

const getCommonPropsForCategory = async (category: string, pageNumber: string) => {
  const { getParamsData, deleteTmpFile } = useFiles();
  const { getItemsByCategory } = useApiRequests();

  const fileData = await getParamsData();
  const pageNumbers = fileData.length;
  const { data } = await getItemsByCategory(`${category}?page=${pageNumber}`);

  deleteTmpFile();
  return {
    props: { [category]: data, pageNumbers, currentPage: +pageNumber },
    revalidate: 30,
  };
};

const redirectToLogin = async () => ({
  props: {},
  redirect: {
    permanent: false,
    destination: LOGIN_URL,
  },
});

const redirect = async (path: string) => ({
  redirect: {
    permanent: false,
    destination: `/${path}`,
  },
});

const useStaticHooks = () => ({
  getCommonPathsForSingleItems,
  getCommonPropsForSingleItems,
  getCommonPathsForCategory,
  getCommonPropsForCategory,
  redirectToLogin,
  redirect,
});

export default useStaticHooks;
