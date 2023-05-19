import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Textarea from "@mui/joy/Textarea";
import { useState } from "react";

interface CommentProps {
  comment: string;
}

export default function Comment({ comment }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState<string>(comment);

  return (
    <>
      {isEditing ? (
        <>
          <Textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            minRows={4}
            maxRows={6}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setIsEditing(false)} variant="text">
              Save
            </Button>
          </div>
        </>
      ) : (
        <>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ wordBreak: "break-word" }}
          >
            {commentText}
          </Typography>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setIsEditing(true)} variant="text">
              Edit
            </Button>
          </div>
        </>
      )}
    </>
  );
}
