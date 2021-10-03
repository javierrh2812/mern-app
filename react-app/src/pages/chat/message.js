export const MessageLeft = ({ message }) => (
  <div
    style={{
      maxWidth: "66%",
      backgroundColor: "#bcbcbc",
      padding: "0.4rem",
    }}
  >
    <span> {message.user}</span> <br />
    {message.text}
  </div>
);

export const MessageRight = ({ message }) => (
  <div
    style={{
      marginLeft: "auto",
      maxWidth: "66%",
      minWidth: "33%",
      color: "white",
      backgroundColor: "#223344",
      padding: "0.5rem",
    }}
  >
    {message.text}
  </div>
);
