import axios from "axios";
import { serialize } from "cookie";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

const appClientSecret = process.env.NEXT_PUBLIC_APP_CLIENT_SECRET;
const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const getToken = async (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  },
  res: ServerResponse
) => {
  // need to check if existing token on cookie is good before checking this
  if (req.url?.includes("code=") && !req.cookies?.token) {
    const code = req.url.split("code=")[1];

    try {
      const { data: accessToken } = await axios.post(`${API_URL}/admin`, {
        code,
        appClientSecret,
        cognitoDomain,
        redirectUri,
      });

      const cookie = serialize("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24,
        sameSite: "strict",
        path: "/",
      });
      res.setHeader("Set-Cookie", cookie);

      return accessToken;
    } catch (error) {
      console.error(error);
    }
  }

  if (!req.cookies?.token) return null;

  try {
    const cookieToken = req.cookies.token;
    await axios.get(`${API_URL}/admin/validate`, {
      headers: { Authorization: cookieToken },
    });
    // this will throw an error if the token is invalid
    return cookieToken;
  } catch (error) {
    // console.error(error);
  }

  return null;
};

const removeToken = async (token: string) => {
  await axios.post("/api/removeCookie", token);
};

const useCookies = () => ({
  getToken,
  removeToken,
});

export default useCookies;
