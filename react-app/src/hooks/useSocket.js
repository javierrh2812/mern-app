import {
  useEffect,
  useRef,
  useState,
  useContext,
  createContext,
  useMemo,
} from "react";
import io from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const server = process.env.REACT_APP_SOCKET;
if (!server) {
  throw Error("REACT_APP_API must be defined into .env");
}

const Context = createContext();

export function SocketProvider({ children }) {
  const io = useProviderSocket();
  return <Context.Provider value={io}>{children}</Context.Provider>;
}

export const useSocket = () => {
  return useContext(Context);
};

const SOCKET_STATES = {
  DISCONNECTED: null,
  CONNECTING: undefined,
  CONNECTED: true,
};

const useProviderSocket = () => {
  const socketRef = useRef(SOCKET_STATES.DISCONNECTED);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketRef.current = io(server, { autoConnect: false });
    //socketRef.current = io(SOCKET_SERVER_URL);
    socketRef.current.on("connect", () => console.log("socket connected"));
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, message => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages(messages => [...messages, incomingMessage]);
    });
  }, []);

  const sendMessage = data => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      ...data,
      senderId: socketRef.current.id,
    });
  };

  const connect = () => {
    console.log("trying to connect socket io");
    socketRef.current && socketRef.current.connect();
  };
  const disconnect = () => {
    console.log("disconnecting socket io");
    socketRef.current && socketRef.current.disconnect();
  };

  const value = useMemo(() => {
    return {
      socketRef,
      messages,
      sendMessage,
      connect,
      disconnect,
    };
  }, [messages]);

  return value;
};
