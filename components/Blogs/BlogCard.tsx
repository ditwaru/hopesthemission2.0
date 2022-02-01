import Link from 'next/link';
export const BlogCard = ({ post, url, children }) => {
  return (
    <div
      key={post.id}
      className="border rounded-lg p-2 my-3 bg-white filter shadow-lg hover:scale-110 transition-all duration-300"
    >
      <Link href={`/posts/${url}`}>
        <a>
          <h2 className="text-lg font-semibold text-green-300 whitespace-nowrap overflow-ellipsis overflow-hidden">
            {post.Title}
          </h2>
          {children}
        </a>
      </Link>
    </div>
  );
};
