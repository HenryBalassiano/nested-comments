import {useState} from "react";
import {v4 as uuidv4} from "uuid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply} from "@fortawesome/free-solid-svg-icons";

interface Comments {
  comment: string;
  id: string;
  replies: Comments[];
}
interface CommentProps {
  comments: Comments[];
  handleReply: (id: string) => void;
  handleReplyText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  replyInput: string | null;
  setReplyInput: React.Dispatch<React.SetStateAction<string | null>>;
  setReplyText: React.Dispatch<React.SetStateAction<string>>;
  replyText: string;
}
export default function Comment({
  comments,
  handleReply,
  handleReplyText,
  replyInput,
  setReplyInput,
  setReplyText,
  replyText,
}: CommentProps) {
  console.log(replyInput);
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="comments-parent" key={comment.id}>
            {comment.comment}
          </div>{" "}
          {replyInput === comment.id ? (
            <div id="reply-input">
              <form
                onSubmit={() => {
                  setReplyInput(null);
                  handleReply(comment.id);
                  setReplyText("");
                }}
              >
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => handleReplyText(e)}
                  required
                />
                <button type="submit"> reply</button>
              </form>
            </div>
          ) : (
            <button
              onClick={() => {
                setReplyInput(comment.id);
              }}
              id="reply-btn"
            >
              {"  "} <FontAwesomeIcon icon={faReply} /> Reply
            </button>
          )}
          {comment.replies && (
            <div style={{margin: "20px"}}>
              <Comment
                comments={comment.replies}
                handleReply={handleReply}
                handleReplyText={handleReplyText}
                replyInput={replyInput}
                setReplyInput={setReplyInput}
                setReplyText={setReplyText}
                replyText={replyText}
              />
            </div>
          )}{" "}
        </div>
      ))}
    </>
  );
}
