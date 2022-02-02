import { useRouter } from 'next/router';

export const LoginRedirect = () => {
  const router = useRouter();
  if (typeof window !== 'undefined') router.push('/admin');
  return <div>Redirecting to login</div>;
};
