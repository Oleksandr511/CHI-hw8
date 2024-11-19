import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface Notification {
  message: string;
}

const URL = import.meta.env.VITE_BASE_URL + "/notifications";

const useWebSocketPostNotifier = (
  onPostReceived: (data: Notification) => void
) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
    });

    socket.on("newPost", (data: Notification) => {
      console.log("New post received via socket:", data);
      onPostReceived(data);
    });
  }, [onPostReceived]);

  return isConnected;
};

export default useWebSocketPostNotifier;
