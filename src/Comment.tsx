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
}
export default function Comment({
  comments,
  handleReply,
  handleReplyText,
  replyInput,
  setReplyInput,
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
              <input type="text" onChange={(e) => handleReplyText(e)} />
              <button
                onClick={() => {
                  setReplyInput(null);
                  handleReply(comment.id);
                }}
              >
                {" "}
                reply
              </button>
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
              />
            </div>
          )}{" "}
        </div>
      ))}
    </>
  );
}
