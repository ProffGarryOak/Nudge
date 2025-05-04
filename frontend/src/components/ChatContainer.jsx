import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const { theme } = useThemeStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto rounded-3xl bg-base-200/60 p-2 md:p-6 shadow-2xl">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-2 md:p-6 space-y-6">
        {messages.map((message) => {
          const isSent = message.senderId === authUser._id;
          // Nuzzle theme: sent = bg-primary text-neutral, received = bg-neutral text-primary
          const bubbleClass =
            theme === "nuzzle"
              ? isSent
                ? "bg-primary text-neutral"
                : "bg-neutral text-primary"
              : isSent
              ? "chat-bubble"
              : "chat-bubble bg-base-200";
          return (
            <div
              key={message._id}
              className={`chat ${isSent ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-14 rounded-full border-4 border-white shadow-lg bg-base-100 flex items-center justify-center">
                  <img
                    src={
                      isSent
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className={`chat-bubble flex flex-col ${bubbleClass} rounded-3xl shadow-xl px-5 py-3 text-base max-w-[80vw] md:max-w-lg ${isSent ? "ml-auto" : "mr-auto"}`}>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-2xl mb-2 shadow"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
