import { NextPage } from 'next';
const SocialPage: NextPage = () => {
  return (
    <div className="max-w-lg w-full p-4">
      <a href={process.env.NEXT_PUBLIC_FB_URL} target="_blank" rel="noreferrer">
        <div className="border rounded-lg py-2 px-4 mt-4 text-center bg-blue-500 text-white font-bold text-xl md:hover:scale-110 transition-all duration-300">
          Facebook
        </div>
      </a>
      <a href={process.env.NEXT_PUBLIC_IG_URL}>
        <div className="border rounded-lg py-2 px-4 mt-4 text-center bg-pink-700 text-white font-bold text-xl md:hover:scale-110 transition-all duration-300">
          Instagram
        </div>
      </a>
    </div>
  );
};

export default SocialPage;
