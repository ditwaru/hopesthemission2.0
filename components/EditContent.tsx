import { useState } from 'react';
import Link from 'next/link';
import { AdminPagination } from 'components/AdminPagination';
import { Search } from 'components/Search';

export const EditContent = ({ contents, Child, type }) => {
  const [postIndex, setPostIndex] = useState(0);
  const [searchText, setSearchText] = useState('');

  const filteredSearchPosts = searchText
    ? contents.filter(
        (post) =>
          post.body.includes(searchText) || post.title.includes(searchText)
      )
    : contents;

  const amount = 5;
  const arr = // if it's a blog, sort it by most recent
    type === 'blog'
      ? filteredSearchPosts
          .sort(
            (a, b) =>
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
          )
          .slice(postIndex, postIndex + amount)
      : filteredSearchPosts.slice(postIndex, postIndex + amount);

  return (
    <>
      <Search searchText={searchText} setSearchText={setSearchText} />
      <div className="w-screen m-5 max-w-lg space-y-5">
        {arr.map((post) =>
          type === 'blog' ? (
            <Child key={post.id} blog={post} url={`edit/${post.id}`} />
          ) : (
            <Child key={post.id} event={post} url={`edit/${post.id}`} />
          )
        )}
        <AdminPagination
          contents={filteredSearchPosts}
          amount={amount}
          setPostIndex={setPostIndex}
        />
      </div>
      <Link href="/admin">
        <a className="border rounded-lg bg-gray-200 py-1 px-3">Cancel</a>
      </Link>
    </>
  );
};
