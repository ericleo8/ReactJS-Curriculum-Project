// import { useState, useEffect } from "react";
// import PostItem from "./PostItem";

// function Feed() {
//     //   const [posts, setPosts] = useState([]);
//     const [posts, setPosts] = useState(() => {
//         const savedPosts = localStorage.getItem("posts");
//         return savedPosts ? JSON.parse(savedPosts) : [];
//     });
//     const [text, setText] = useState("");

//     // useEffect(() => {
//     //     const savedPosts = localStorage.getItem("posts");
//     //     if (savedPosts) {
//     //         setPosts(JSON.parse(savedPosts));
//     //     }
//     // }, []);

//     useEffect(() => {
//         localStorage.setItem("posts", JSON.stringify(posts));
//     }, [posts]);

//     function handleSubmit(e) {
//         e.preventDefault();
//         if (text.trim() === "") return;

//         const newPost = {
//             id: Date.now(),
//             content: text,
//             likes: 0,
//             liked: false
//         };

//         setPosts([newPost, ...posts]);
//         setText("");
//     }

//     function handleDelete(id) {
//         setPosts(posts.filter(post => post.id !== id));
//     }

//     function handleLike(id) {
//         const updatedPosts = posts.map(post =>
//             post.id === id
//                 ? {
//                     ...post,
//                     liked: !post.liked,
//                     likes: post.liked ? post.likes - 1 : post.likes + 1
//                 }
//                 : post
//         );

//         setPosts(updatedPosts);
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     placeholder="Write something..."
//                 />
//                 <button type="submit">Post</button>
//             </form>

//             {posts.length === 0 ? (
//                 <p>No posts yet</p>
//             ) : (
//                 posts.map(post => (
//                     <PostItem
//                         key={post.id}
//                         {...post}
//                         onLike={() => handleLike(post.id)}
//                         onDelete={() => handleDelete(post.id)}
//                     />
//                 ))
//             )}
//         </div>
//     );
// }

// export default Feed;

import { useState, useEffect } from "react";
import PostItem from "./PostItem";

function Feed() {

  const MAX_CHAR = 100;

  // =====================
  // STATE
  // =====================
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const [text, setText] = useState("");

  // =====================
  // EFFECT
  // =====================
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // =====================
  // HANDLERS
  // =====================
  function handleAddPost(e) {
    e.preventDefault();

    if (text.trim() === "") return;
    if (text.length > MAX_CHAR) return;

    const newPost = {
      id: Date.now(),
      content: text,
      likes: 0,
      liked: false,
      createdAt: new Date().toISOString()
    };

    setPosts(prev => [newPost, ...prev]);
    setText("");
  }

  function handleDeletePost(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    setPosts(prev => prev.filter(post => post.id !== id));
  }

  function handleLikePost(id) {
    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  }

  function handleEditPost(id, newContent) {
    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? { ...post, content: newContent }
          : post
      )
    );
  }

  // =====================
  // RENDER
  // =====================
  return (
    <div className="feed">

      <form onSubmit={handleAddPost} className="form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
        />

        <p className={text.length > MAX_CHAR ? "counter warning" : "counter"}>
          {text.length}/{MAX_CHAR} characters
        </p>

        <button
          type="submit"
          disabled={text.length > MAX_CHAR}
        >
          Post
        </button>
      </form>

      {posts.length === 0 ? (
        <p className="empty">No posts yet</p>
      ) : (
        posts.map(post => (
          <PostItem
            key={post.id}
            {...post}
            onLike={() => handleLikePost(post.id)}
            onDelete={() => handleDeletePost(post.id)}
            onEdit={handleEditPost}
          />
        ))
      )}
    </div>
  );
}

export default Feed;