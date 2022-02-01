// import { useState } from 'react';
// import { BlogCard } from './BlogCard';

// export const EditBlog = ({ posts }) => {
//   const [editBlogWidget, setEditBlogWidgetState] = useState(1);

//   if (editBlogWidget === 0)
//     return (
//       <div className="w-full p-5 max-w-lg">
//         {posts.map((post) => (
//           <BlogCard key={post.id} post={post} url={`edit/${post.id}`} />
//         ))}
//         <button
//           onClick={() => setEditBlogWidgetState(1)}
//           className="border rounded-lg px-4 bg-gray-200"
//         >
//           Cancel
//         </button>
//       </div>
//     );

//   return (
//     <div>
//       <button
//         className="border w-48 bg-blue-400 rounded-lg"
//         onClick={() => {
//           setEditBlogWidgetState(0);
//         }}
//       >
//         Edit a blog
//       </button>
//     </div>
//   );
// };
