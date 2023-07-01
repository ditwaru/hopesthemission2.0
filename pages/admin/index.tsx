import { NextPage, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useCookies from "hooks/useCookies";
import { serialize } from "cookie";
import useStaticHooks from "hooks/useStaticHooks";

interface Props {
  token: string;
  events: [];
  blogs: [];
}

const logoutURL = process.env.NEXT_PUBLIC_LOGOUT;

export const AdminPage: NextPage<Props> = ({ token, events, blogs }) => {
  const [tokenState, setTokenState] = useState(token);
  const { removeToken } = useCookies();
  const router = useRouter();

  const handleLogout = async () => {
    await removeToken(tokenState);
    router.push(`${logoutURL}`);
  };

  if (tokenState) {
    return (
      <>
        <h1 className="text-3xl font-bold my-10 text-center">Admin Dashboard</h1>
        <div className="absolute top-24 right-10 flex-col flex">
          <button onClick={handleLogout}>Log Out</button>
        </div>
        <div className="flex flex-col space-y-5">
          <Link href="/admin/about-editor">
            <a className="border rounded-lg p-2 bg-white filter shadow-lg md:hover:scale-110 transition-all duration-300">
              Edit About Page
            </a>
          </Link>
          <Link href="/admin/blog-creator">
            <a className="border rounded-lg p-2 bg-white filter shadow-lg md:hover:scale-110 transition-all duration-300">
              Create Blog
            </a>
          </Link>
          <Link href="/admin/blogs">
            <a
              className={`border rounded-lg p-2 bg-white filter shadow-lg md:hover:scale-110 transition-all duration-300`}
            >
              Edit Blog
            </a>
          </Link>
          <Link href="/admin/event-creator">
            <a className="border rounded-lg p-2 bg-white filter shadow-lg md:hover:scale-110 transition-all duration-300">
              Create Event
            </a>
          </Link>
          <Link href="/admin/events">
            <a
              className={`border rounded-lg p-2 bg-white filter shadow-lg md:hover:scale-110 transition-all duration-300`}
            >
              Edit Event
            </a>
          </Link>
        </div>
      </>
    );
  }
  return (
    <div>
      You must be logged in to view this page. Log in <a href={`${process.env.NEXT_PUBLIC_LOGIN}`}>here</a>
    </div>
  );
};

export default AdminPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { getToken } = useCookies();
  const { redirectToLogin, redirect } = useStaticHooks();
  const token = await getToken(req, res);

  // if (!token) {
  //   return redirect("500");
  // }

  return {
    props: { token },
  };
};
