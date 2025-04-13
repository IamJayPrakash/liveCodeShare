import { useContext, useEffect, useState } from "react";
import { SocketContext } from "@/context/SocketContext";

export const useSocket = () => {
  const context = useContext(SocketContext);
  const [socket, setSocket] = useState(context);

  useEffect(() => {
    if (context) {
      setSocket(context);
    }
  }, [context]);

  return socket;
};
