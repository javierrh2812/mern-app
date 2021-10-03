import { useState } from "react";
import { useSocket } from "hooks/useSocket";
import { useAuth } from "hooks/useUser";
import { Card, Button, TextField } from "@mui/material";
import { MessageLeft, MessageRight } from "./message";
export default function Chat() {
  const { messages, sendMessage } = useSocket();
  const { user } = useAuth();

  const sendNewMessage = text => {
    sendMessage({ text, user: user.firstName });
  };
  return (
    <Card
      sx={{
        height: "100%",
        padding: "1rem",
        display: "grid",
        gridTemplateRows: "10% 80% 10%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Chat</h1>
      <div
        style={{
          paddingTop: "1rem",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {messages.map((message, i) =>
          message.ownedByCurrentUser ? (
            <MessageRight key={`message${i}`} message={message} />
          ) : (
            <MessageLeft key={`message${i}`} message={message} />
          )
        )}
      </div>
      <MessageChat callback={sendNewMessage} />
    </Card>
  );
}

function MessageChat({ callback }) {
  const [message, setMessage] = useState("");
  return (
    <TextField
      placeholder="write message"
      value={message}
      onChange={e => setMessage(e.target.value)}
      fullWidth
      InputProps={{
        endAdornment: (
          <Button
            onClick={() => {
              setMessage("");
              callback(message);
            }}
          >
            Enviar mensaje
          </Button>
        ),
      }}
    />
  );
}
