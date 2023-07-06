import { useState } from "react";
import Link from "next/link";
import { AdminPagination } from "components/AdminPagination";
import { Search } from "components/Search";

interface Props {
  contents: {
    content: string;
    title: string;
    published: string;
    id: string;
    slug: string;
    date: string;
  }[];
  Child: React.FC<any>;
  type: string;
}
//TODO this should be using the backend's pagination

export const EditContent = ({ contents, Child, type }: Props) => {
  const [postIndex, setPostIndex] = useState(0);
  const [searchText, setSearchText] = useState("");

  const filteredSearchPosts = searchText
    ? contents.filter((post) => post.content.includes(searchText) || post.title.includes(searchText))
    : contents;

  const amount = 5;
  const arr = // if it's a blog, sort it by most recent
    type === "blog"
      ? filteredSearchPosts
          .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
          .slice(postIndex, postIndex + amount)
      : filteredSearchPosts.sort((a, b) => +a.date - +b.date).slice(postIndex, postIndex + amount);

  return (
    <>
      <div className="flex justify-between items-center">
        <Search searchText={searchText} setSearchText={setSearchText} />
        <Link href="/admin">
          <a className="rounded-lg bg-gray-200 py-1 mb-5 px-3 hover:bg-gray-300">Cancel</a>
        </Link>
      </div>
      <div className="space-y-5">
        {arr.map((post) =>
          type === "blog" ? (
            <Child key={post.id} blog={post} slug={`edit/${post.id}`} />
          ) : (
            <Child key={post.id} event={post} slug={`edit/${post.id}`} />
          )
        )}
        <AdminPagination contents={filteredSearchPosts} amount={amount} setPostIndex={setPostIndex} />
      </div>
    </>
  );
};
