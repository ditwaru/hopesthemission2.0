import Link from 'next/link';
export const BlogCard = ({ post, url }) => {
  return (
    <div
      key={post.id}
      className="border rounded-lg p-2 bg-white filter shadow-lg hover:scale-110 transition-all duration-300 mx-5"
    >
      <Link href={`/posts/${url}`}>
        <a>
          <h2 className="text-lg font-semibold text-green-300 whitespace-nowrap overflow-ellipsis overflow-hidden">
            {post.Title}
          </h2>
          <p className="whitespace-nowrap overflow-ellipsis overflow-hidden">
            {post.Content}
          </p>
        </a>
      </Link>
    </div>
  );
};
