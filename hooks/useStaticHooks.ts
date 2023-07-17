import useApiRequests from "./useApiRequests";

import { GetStaticPathsResult, GetStaticPropsResult } from "next";

const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN;
const BUCKET_NAME = process.env.NEXT_PUBLIC_BUCKET_NAME;

const getCommonPathsForSingleItems = async (category: string): Promise<GetStaticPathsResult> => {
  const { getItemsByCategory } = useApiRequests();
  const { data } = await getItemsByCategory(category);
  const paths = data.map(({ slug }: { slug: string }) => {
    const params = { slug };
    return { params };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

const getCommonPropsForSingleItems = async (
  slug: string,
  category: string
): Promise<GetStaticPropsResult<{ [key: string]: unknown & { props: unknown } }>> => {
  try {
    const { getItemById, getItemsByCategory } = useApiRequests();
    const { data: items } = await getItemsByCategory(category);
    const search = items?.find((item: { slug: string }) => item.slug === slug);

    const { data } = await getItemById(category, search.id);
    return {
      props: {
        [category.substring(0, category.length - 1)]: data, // so blogs will return as blog
      },
      revalidate: 30,
    };
  } catch (err) {
    console.error(err);
  }

  return redirect("404");
};

const getCommonPathsForCategory = async (category: string) => {
  const { getItemsByCategory } = useApiRequests();

  const { data } = await getItemsByCategory(category);

  const paths = Array.from({ length: Math.ceil(data.length / 5) }, (_, i) => {
    const params = { pageNumber: (i + 1).toString() };
    return { params };
  }); //this convoluted thing just makes a new array with a length of ${total} / ${limit}

  return {
    paths,
    fallback: "blocking",
  };
};

const getCommonPropsForCategory = async (category: string, pageNumber: string) => {
  const { getItemsByCategory } = useApiRequests();
  const { data } = await getItemsByCategory(`${category}?page=${pageNumber}`);
  const { data: allcategories } = await getItemsByCategory(category);
  const pageNumbers = Math.ceil(allcategories.length / 5);
  return {
    props: { [category]: data, pageNumbers: pageNumbers, currentPage: +pageNumber },
    revalidate: 30,
  };
};

const getArrayFromS3Urls = async (token: string) => {
  const { getS3Urls } = useApiRequests();
  const { data } = await getS3Urls(token);
  if (!BUCKET_NAME) throw new Error("Bucket name undefined");
  return data?.map((key: string) => `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`) || null;
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
  getArrayFromS3Urls,
  redirectToLogin,
  redirect,
});

export default useStaticHooks;
