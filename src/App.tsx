import {useState} from "react";
import {v4 as uuidv4} from "uuid";
import Comment from "./Comment";
import "./App.css";
interface Comments {
  comment: string;
  id: string;
  replies: Comments[];
}
function App() {
  const [commentText, setCommentText] = useState<string>("");
  const [replyText, setReplyText] = useState<string>("");
  const [replyInput, setReplyInput] = useState<string | null>("");

  const [comments, setComments] = useState<Comments[]>([]);

  function createComment(input: string): Comments {
    return {
      comment: input,
      id: uuidv4(),
      replies: [],
    };
  }

  const handleReply = (id: string) => {
    // function to go through state comments
    const reply = (commentsChildren: Comments[]): Comments[] => {
      return commentsChildren.map((item) =>
        // check if the id on the high level matches the current id the user clicked on
        item.id === id
          ? {
              ...item,
              // if its found, we update the current level replies
              replies: [createComment(replyText), ...item.replies],
            }
          : {
              // if its not found at current level
              // we recursvley call this function on the current replies array
              // we do this until the intial check is true
              ...item,
              replies: reply(item.replies),
            }
      );
    };

    setComments((prevState) => reply(prevState));
  };

  const addComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };
  const postComment = () => {
    setComments((prevState) => [...prevState, createComment(commentText)]);
    setCommentText("");
    console.log(commentText);
  };
  const handleReplyText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(e.target.value);
  };
  console.log(comments, replyText);

  return (
    <div className="app">
      <div id="post-comment">
        <input
          type="text"
          onChange={(e) => {
            addComment(e);
          }}
          value={commentText}
        />
        <button onClick={postComment}>Post Comment</button>
      </div>
      <div className="app-container">
        <Comment
          comments={comments}
          handleReply={handleReply}
          handleReplyText={handleReplyText}
          replyInput={replyInput}
          setReplyInput={setReplyInput}
        />
      </div>
    </div>
  );
}

export default App;
