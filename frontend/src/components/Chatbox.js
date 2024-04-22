import React from 'react'
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/layout";


const Chatbox = () => {
  const { selectedChat } = ChatState();


  return  <Box d={{ base: selectedChat ? "flex" : "none", md:"flex"}}
                alignItems="center"
                flexDir="column"
                p={4}
                bg="white"
                w={{base: "100%", md: "68%"}}
                borderRadius="lg"
                borderWidth="1px"
  >             
    Single Chat
  </Box>
};

export default Chatbox;
