import Link from 'next/link';
interface Props {
  blog: {
    title: string;
    body: string;
  };
  slug: string;
}
export const BlogCard: React.FC<Props> = ({ blog, slug }) => {
  return (
    <div className="border rounded-lg p-2 bg-white filter shadow-lg md:md:hover:scale-110 transition-all duration-300">
      <Link href={`/blogs/${slug}`}>
        <a>
          <h2 className="text-3xl font-semibold font-nanumPen whitespace-nowrap overflow-ellipsis overflow-hidden">
            {blog.title}
          </h2>
          <p className="whitespace-nowrap overflow-ellipsis overflow-hidden">
            {blog.body}
          </p>
        </a>
      </Link>
    </div>
  );
};
