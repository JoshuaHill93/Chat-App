import React from 'react'
import { ChatState } from "../Context/ChatProvider";
import { Box, Text } from "@chakra-ui/layout";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton, } from "@chakra-ui/react";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';


const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const { user, selectedChat, setSelectedChat } = ChatState();

    const fetchMessages = () => {};



  return <>{
        selectedChat ? (
            <>
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              pb={3}
              px={2}
              w="100%"
              fontFamily="Work sans"
              d="flex"
              justifyContent={{ base: "space-between" }}
              alignItems="center"
                  >
                      <IconButton
                    d={{ base: "flex", md: "none" }}
                    icon={<ArrowBackIcon />}
                    onClick={() => setSelectedChat("")}
                    />
                    {!selectedChat.isGroupChat ? (
                <>{getSender(user,selectedChat.users)}
                    <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                </>
                    ) : (
                        <>
                        {selectedChat.chatName.toUpperCase()}
                         <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                        </>
                    )}
            </Text>
            <Box
              d="flex" //
              flexDir="column"
              justifyContent="flex-end"
              p={3}
              bg="#C54A9C"
              w="100%"
              h="93%"
              borderRadius="lg"
              overflowy="hidden"
            >
                {/* messages here*/}
            </Box>

             </>
        ) : (
            <Box display="flex" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                Click on a user to start chatting
            </Text>
            </Box>
        )}
    </>
}

export default SingleChat;
