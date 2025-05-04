import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex flex-row gap-6 justify-center items-center min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 px-2 md:px-8">
      {/* Sidebar bubble */}
      <div className="rounded-3xl shadow-2xl bg-base-100/90 border-2 border-primary/10 w-20 lg:w-80 h-[80vh] flex-shrink-0 flex flex-col overflow-hidden">
        <Sidebar />
      </div>
      {/* Chat area bubble */}
      <div className="rounded-3xl shadow-2xl bg-base-100/90 border-2 border-primary/10 flex-1 min-w-0 h-[80vh] flex flex-col overflow-hidden">
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
};
export default HomePage;
