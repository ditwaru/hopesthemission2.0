import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 0,
      sameSite: 'strict',
      path: '/',
      expires: new Date(),
    })
  );

  res.statusCode = 200;
  res.json({ success: true });
};
