import { useState } from "react";

function PostItem({
  id,
  content,
  likes,
  liked,
  createdAt,
  onLike,
  onDelete,
  onEdit
}) {

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content);

  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="post">

      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button
            onClick={() => {
              onEdit(id, editText);
              setIsEditing(false);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p>{content}</p>
          <small className="timestamp">{formattedDate}</small>
        </>
      )}

      <div className="actions">
        <button
          onClick={onLike}
          className={liked ? "liked" : ""}
        >
          {liked ? "Unlike" : "Like"}
        </button>

        <span>{likes} likes</span>

        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>

        <button onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default PostItem;