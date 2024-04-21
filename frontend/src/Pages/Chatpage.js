import { Box } from "@chakra-ui/layout";
//import { useState } from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";

const ChatPage = () => {
  
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="90vh" p="10px">
        {user && <MyChats />}
        {user && <Chatbox  />}
      </Box>
    </div>
  );
};

export default ChatPage;